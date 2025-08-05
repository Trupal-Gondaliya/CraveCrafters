<?php
$servername = "127.0.0.1:3306";
$username = "root"; // Default XAMPP MySQL username
$password = ""; // Default XAMPP MySQL password
$dbname = "cravecrafters";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];

// Check if email already exists
$stmt = $conn->prepare("SELECT id FROM usersigninfo WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo "<script>alert('An account with this email already exists.')</script>";
} else {
    // Insert new user
    $stmt = $conn->prepare("INSERT INTO usersigninfo (email, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $password);
    if ($stmt->execute()) {
        echo "<script>alert('Sign up successful!')</script>";
        // Redirect to sign-in page
        echo "<script>
                window.location.href = 'signin.html';
              </script>";
    } else {
        echo "Error: " . $stmt->error;
    }
}

$stmt->close();
$conn->close();
?>
