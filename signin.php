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

// Prepare and bind
$stmt = $conn->prepare("SELECT password FROM usersigninfo WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($stored_password);
    $stmt->fetch();
    
    if ($password === $stored_password) {
        echo "<script>alert('Sign in successful!')</script>";
        echo "<script>
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'index.html';
              </script>";
    } else {
        echo "<script>alert('Invalid password.')</script)";
        echo "<script>
                localStorage.setItem('isLoggedIn', 'false');
                window.location.href = 'signin.html';
              </script>";
    }
} else {
    echo "<script>alert('No account found with this email.')</script>";
    echo "<script>
                localStorage.setItem('isLoggedIn', 'false');
                window.location.href = 'signin.html';
              </script>";
}

$stmt->close();
$conn->close();
?>
