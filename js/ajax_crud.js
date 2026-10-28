/**
 * Practical 13: AJAX / Fetch-Based CRUD Operations without Page Reload
 * Subject: Web Development Frameworks (ITUE203) - Semester 3
 */

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("ajaxEventsTableBody");
    const addForm = document.getElementById("ajaxAddEventForm");
    const loadingState = document.getElementById("ajaxLoading");
    const statusAlert = document.getElementById("ajaxAlert");

    // Helper: Show feedback message
    function showAlert(message, isSuccess) {
        if (!statusAlert) return;
        statusAlert.className = isSuccess ? "alert alert-success" : "alert alert-danger";
        statusAlert.textContent = message;
        statusAlert.style.display = "block";
        setTimeout(function () {
            statusAlert.style.display = "none";
        }, 4000);
    }

    // 1. Fetch & Render Events using Fetch API (GET)
    function loadEvents() {
        if (loadingState) loadingState.style.display = "block";
        if (tableBody) tableBody.innerHTML = "";

        fetch("api/events_api.php")
            .then(function (res) {
                return res.json();
            })
            .then(function (response) {
                if (loadingState) loadingState.style.display = "none";

                if (response.status === "success" && Array.isArray(response.data)) {
                    renderTable(response.data);
                } else {
                    showAlert("Failed to retrieve events: " + (response.message || "Unknown error"), false);
                }
            })
            .catch(function (err) {
                if (loadingState) loadingState.style.display = "none";
                showAlert("Network or server error: " + err.message, false);
            });
    }

    // 2. Render Table Rows
    function renderTable(events) {
        if (!tableBody) return;
        tableBody.innerHTML = "";

        if (events.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">No events found. Add your first event using the form below!</td></tr>`;
            return;
        }

        events.forEach(function (ev) {
            const tr = document.createElement("tr");
            tr.id = `event-row-${ev.id}`;
            tr.innerHTML = `
                <td><strong>#${ev.id}</strong></td>
                <td><strong>${escapeHtml(ev.title)}</strong></td>
                <td><span class="badge" style="background: rgba(13,110,253,0.1); color: #0d6efd; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">${escapeHtml(ev.category)}</span></td>
                <td>📅 ${escapeHtml(ev.event_date)}</td>
                <td>📍 ${escapeHtml(ev.venue)}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${ev.id}">
                        🗑️ Delete
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Attach delete handlers
        document.querySelectorAll(".delete-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                const eventId = this.getAttribute("data-id");
                deleteEvent(eventId);
            });
        });
    }

    // 3. Add Event via AJAX POST without Page Reload
    if (addForm) {
        addForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = document.getElementById("ajax_title").value.trim();
            const category = document.getElementById("ajax_category").value;
            const event_date = document.getElementById("ajax_date").value;
            const venue = document.getElementById("ajax_venue").value.trim();
            const description = document.getElementById("ajax_desc").value.trim();

            if (!title || !venue || !description) {
                showAlert("Please complete all required fields.", false);
                return;
            }

            const payload = {
                action: "add",
                title: title,
                category: category,
                event_date: event_date,
                venue: venue,
                description: description
            };

            const submitBtn = addForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            fetch("api/events_api.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(function (res) {
                    return res.json();
                })
                .then(function (result) {
                    if (submitBtn) submitBtn.disabled = false;
                    if (result.status === "success") {
                        showAlert(result.message, true);
                        addForm.reset();
                        loadEvents(); // Reload asynchronously without page refresh
                    } else {
                        showAlert(result.message || "Failed to add event.", false);
                    }
                })
                .catch(function (err) {
                    if (submitBtn) submitBtn.disabled = false;
                    showAlert("Error adding event: " + err.message, false);
                });
        });
    }

    // 4. Delete Event via AJAX without Page Reload
    function deleteEvent(id) {
        if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
            return;
        }

        const payload = {
            action: "delete",
            id: id
        };

        fetch("api/events_api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (result) {
                if (result.status === "success") {
                    showAlert(result.message, true);
                    const row = document.getElementById(`event-row-${id}`);
                    if (row) {
                        row.remove();
                    } else {
                        loadEvents();
                    }
                } else {
                    showAlert(result.message || "Could not delete event.", false);
                }
            })
            .catch(function (err) {
                showAlert("Error deleting event: " + err.message, false);
            });
    }

    // Helper: Escape HTML strings
    function escapeHtml(text) {
        if (!text) return "";
        return text
            .toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Initial fetch
    loadEvents();
});
