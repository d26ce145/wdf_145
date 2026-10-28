export function renderStudents(students, container) {

    container.innerHTML = "";

    if (students.length === 0) {
        container.innerHTML = "<p>No students found.</p>";
        return;
    }

    students.forEach(student => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${student.name}</h3>
            <p>Email: ${student.email}</p>
            <p>Course: ${student.course}</p>
            <p>Age: ${student.age}</p>
        `;

        container.appendChild(card);
    });
}