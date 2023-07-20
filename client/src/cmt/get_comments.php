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

// Sélectionner les commentaires depuis la base de données
$sql = "SELECT * FROM comments ORDER BY date DESC";
$result = $conn->query($sql);

$comments = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $comment = array(
            'name' => $row['name'],
            'comment' => $row['comment'],
            'date' => $row['date']
        );
        $comments[] = $comment;
    }
}

$conn->close();

// Renvoyer les commentaires au format JSON
header('Content-Type: application/json');
echo json_encode($comments);
?>