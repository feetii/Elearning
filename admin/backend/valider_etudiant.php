<?php
// Afficher les erreurs PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connexion à la base de données (à compléter avec tes propres informations)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "elearning";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer l'ID de l'étudiant à valider depuis la requête GET
$idEtudiant = $_GET['id'];

// Mettre à jour le statut de l'étudiant dans la base de données
$sql = "UPDATE etudiant SET stat = 'valide' WHERE id_etu = '$idEtudiant'";
$result = $conn->query($sql);

// Retourner une réponse JSON
// Retourner une réponse JSON
$response = array('success' => false);
if ($result) {
    $response['success'] = true;
} else {
    // Ajouter des logs en cas d'erreur
    file_put_contents('logs/valider_e');
}

// Set the Content-Type header to JSON
header('Content-Type: application/json');

// Output the JSON response
echo json_encode($response);
    ?>

