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
$sql = "SELECT id_ens, nom_ens, prenom_ens,email_ens ,grade_ens FROM enseignant WHERE stat = 'en attente'";
$result = $conn->query($sql);

// Retourner les résultats en JSON
$enseignants = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $enseignants[] = $row;
    }
}

// Ajouter des logs
error_log("Script exécuté avec succès - Nombre d'étudiants en attente: " . count($enseignants));

echo json_encode($enseignants);

$conn->close();
?>
