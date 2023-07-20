<?php
// Connexion à la base de données (à adapter selon votre configuration)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "app";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Erreur de connexion à la base de données : " . $conn->connect_error);
}

// Récupérer les données du formulaire
$name = $_POST['name'];
$comment = $_POST['comment'];
$date = date('Y-m-d H:i:s');

// Insérer le commentaire dans la base de données
$sql = "INSERT INTO comments (name, comment, date) VALUES ('$name', '$comment', '$date')";
if ($conn->query($sql) === FALSE) {
    echo "Erreur lors de l'insertion du commentaire : " . $conn->error;
}

$conn->close();
?>