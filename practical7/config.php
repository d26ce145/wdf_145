<?php
$servername = "localhost";
$username = "root";
$password = '';
$dbname = 'pract8';

try{
$conn=new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
echo"CONNECTED SUCCESSFULLY";
} catch(PDOException $e) {
  echo "CONNECTION FAILED". $e->getMessage();
}