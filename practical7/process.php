<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request method.");
}



$name = $_POST["name"] ?? "";
$email = $_POST["email"] ?? "";
$mobile = $_POST["mobile"] ?? "";
$course = $_POST["course"] ?? "";
$year = $_POST["year"] ?? "";
$gender = $_POST["gender"] ?? "";



$name = trim($name);
$email = trim($email);
$mobile = trim($mobile);
$course = trim($course);
$year = trim($year);
$gender = trim($gender);




$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$mobile = htmlspecialchars($mobile);
$course = htmlspecialchars($course);
$year = htmlspecialchars($year);
$gender = htmlspecialchars($gender);



$errors = [];




if ($name === "") {
    $errors[] = "Name is required.";
}



if ($email === "") {

    $errors[] = "Email is required.";

} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    $errors[] = "Enter a valid email address.";

}




if (!preg_match("/^[0-9]{10}$/", $mobile)) {

    $errors[] =
        "Mobile number must contain exactly 10 digits.";

}



if ($course === "") {

    $errors[] = "Please select a course.";

}




if ($year === "") {

    $errors[] = "Please select a year.";

}




if ($gender === "") {

    $errors[] = "Please select your gender.";

}




if (!empty($errors)) {

    echo "<h2>Please fix the following errors:</h2>";

    echo "<ul>";

    foreach ($errors as $error) {

        echo "<li>" . htmlspecialchars($error) . "</li>";

    }

    echo "</ul>";

    echo '<a href="index.php">Go Back</a>';

    exit;
}



$file = "data/registrations.csv";

$handle = fopen($file, "a");


if ($handle === false) {

    die("Unable to open storage file.");

}




$row = [
    date("Y-m-d H:i:s"),
    $name,
    $email,
    $mobile,
    $course,
    $year,
    $gender
];




fputcsv($handle, $row);




fclose($handle);




echo "<h2>Registration Successful!</h2>";

echo "<p>Your details have been saved successfully.</p>";

echo '<a href="index.php">Register another student</a>';

?>