<?php
// Connexion à la base de données (à compléter avec tes propres informations)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



// Log pour indiquer que le script est exécuté

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "elearning";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer les étudiants en attente
$sql = "SELECT id_module, nom_module, desc_mod FROM modules WHERE stat = 'en attente'";
$result = $conn->query($sql);

// Retourner les résultats en JSON
$moduls = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $moduls[] = $row;
    }
}

// Ajouter des logs
error_log("Script exécuté avec succès - Nombre d'étudiants en attente: " . count($moduls));

echo json_encode($moduls);

$conn->close();
?>
