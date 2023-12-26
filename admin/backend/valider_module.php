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

// Récupérer l'ID du cours à valider depuis la requête GET
$idModul = $_GET['id'];

// Utiliser une requête préparée pour éviter les injections SQL
$sql = "UPDATE modules SET stat = 'valide' WHERE id_module = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $idModul);
$result = $stmt->execute();

// Retourner une réponse JSON
$response = array('success' => false);
if ($result) {
    $response['success'] = true;
} else {
    // Ajouter des logs en cas d'erreur
    file_put_contents('logs/valider_cour_error.log', $stmt->error);
}

// Fermer la requête et la connexion
$stmt->close();
$conn->close();

// Set the Content-Type header to JSON
header('Content-Type: application/json');

// Output the JSON response
echo json_encode($response);
?>
