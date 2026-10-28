
export async function fetchStudents() {

    const response = await fetch("../data/students.json");

    if (!response.ok) {
        throw new Error("Failed to fetch student data");
    }

    const data = await response.json();

    return data;
}