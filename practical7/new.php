<?php
    $dbLocalhost=mysqli_connect("localhost","root","")
    or die("could not connect".mysqli_connect_error());
    mysqli_select_db($dbLocalhost, "pract8")
    or die("could not find".mysqli_error($dbLocalhost));
    echo"<h1>connected to database</h1>";

?>