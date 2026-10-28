<?php
/**
 * Practical 13: PHP JSON API Endpoint for Events
 * Subject: Web Development Frameworks (ITUE203) - Semester 3
 * Handles asynchronous GET (list) and POST (add, delete) requests
 */

header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/../db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Parse input if sent as JSON payload
$inputJSON = json_decode(file_get_contents('php://input'), true);
$data = !empty($inputJSON) ? $inputJSON : $_POST;

try {
    if ($method === 'GET') {
        // GET: Fetch all events
        $sql = "SELECT * FROM events ORDER BY id DESC";
        $result = $conn->query($sql);

        $events = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $events[] = $row;
            }
        }

        echo json_encode([
            'status' => 'success',
            'count' => count($events),
            'data' => $events
        ]);
        exit();
    }

    if ($method === 'POST') {
        $action = isset($data['action']) ? trim($data['action']) : 'add';

        if ($action === 'add') {
            // Add new event
            $title = isset($data['title']) ? trim($data['title']) : '';
            $description = isset($data['description']) ? trim($data['description']) : '';
            $category = isset($data['category']) ? trim($data['category']) : 'General';
            $event_date = isset($data['event_date']) ? trim($data['event_date']) : date('Y-m-d');
            $venue = isset($data['venue']) ? trim($data['venue']) : '';

            // Server-side validation
            if (empty($title) || empty($description) || empty($venue)) {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Title, description, and venue are required.'
                ]);
                exit();
            }

            $stmt = $conn->prepare("INSERT INTO events (title, description, category, event_date, venue, status) VALUES (?, ?, ?, ?, ?, 'Upcoming')");
            $stmt->bind_param("sssss", $title, $description, $category, $event_date, $venue);

            if ($stmt->execute()) {
                $insertedId = $stmt->insert_id;
                $stmt->close();

                // Optional: log audit
                $logAction = "API: Created event - " . $title;
                $user = "API_User";
                $role = "system";
                $logStmt = $conn->prepare("INSERT INTO audit_logs (action, username, role) VALUES (?, ?, ?)");
                $logStmt->bind_param("sss", $logAction, $user, $role);
                $logStmt->execute();
                $logStmt->close();

                echo json_encode([
                    'status' => 'success',
                    'message' => 'Event added successfully via JSON API!',
                    'id' => $insertedId
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Database error: ' . $stmt->error
                ]);
            }
            exit();
        }

        if ($action === 'delete') {
            // Delete event
            $id = isset($data['id']) ? intval($data['id']) : 0;
            if ($id <= 0) {
                http_response_code(400);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Invalid event ID.'
                ]);
                exit();
            }

            $stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
            $stmt->bind_param("i", $id);

            if ($stmt->execute()) {
                $stmt->close();
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Event deleted successfully via JSON API!'
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Database delete error: ' . $stmt->error
                ]);
            }
            exit();
        }

        // Unknown action
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Unknown POST action: ' . htmlspecialchars($action)
        ]);
        exit();
    }

    // Unsupported method
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed.'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Server exception: ' . $e->getMessage()
    ]);
}
?>
