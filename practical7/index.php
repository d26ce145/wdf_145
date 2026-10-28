<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Student Registration</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            padding: 30px;
        }

        form {
            max-width: 500px;
            margin: auto;
            background: white;
            padding: 25px;
            border-radius: 10px;
        }

        input,
        select {
            width: 100%;
            padding: 10px;
            margin: 8px 0 15px;
            box-sizing: border-box;
        }

        button {
            padding: 10px 20px;
            cursor: pointer;
        }

        label {
            font-weight: bold;
        }
    </style>

</head>

<body>

    <form action="process.php" method="POST">

        <h1>Student Registration</h1>

        <label>Name</label>
        <input type="text" name="name">

        <label>Email</label>
        <input type="email" name="email">

        <label>Mobile</label>
        <input type="text" name="mobile">

        <label>Course</label>

        <select name="course">

            <option value="">Select Course</option>

            <option value="Computer Engineering">
                Computer Engineering
            </option>

            <option value="IT Engineering">
                IT Engineering
            </option>

            <option value="AI & ML">
                AI & ML
            </option>

        </select>

        <label>Year</label>

        <select name="year">

            <option value="">Select Year</option>

            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>

        </select>

        <label>Gender</label>

        <input type="radio" name="gender" value="Male">
        Male

        <input type="radio" name="gender" value="Female">
        Female

        <input type="radio" name="gender" value="Other">
        Other

        <br><br>

        <button type="submit">
            Register
        </button>

    </form>

</body>

</html>