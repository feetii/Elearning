<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "elearning";

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die(json_encode(array('success' => false, 'message' => 'Connection failed: ' . $conn->connect_error)));
    }

    // Get data from the request
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $prenom = isset($_POST['prenom']) ? $_POST['prenom'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $uid = isset($_POST['uid']) ? $_POST['uid'] : '';
    $statu = isset($_POST['statu']) ? $_POST['statu'] : '';
    $anne = isset($_POST['anne']) ? $_POST['anne'] : '';
    $grade = isset($_POST['grade']) ? $_POST['grade'] : '';
    $matricule = isset($_POST['matricule']) ? $_POST['matricule'] : '';
    $userType = isset($_POST['userType']) ? $_POST['userType'] : '';

    // Insert into the appropriate table based on user type
    if ($userType === 'etudiant') {
        $stmt = $conn->prepare("INSERT INTO etudiant (id_etu, nom_etu, prenom_etu, email_etu, annee, matricule,stat) VALUES (?, ?, ?, ?, ?, ?,'en attente')");
        $stmt->bind_param("ssssss", $uid, $name, $prenom, $email, $anne, $matricule);
    } elseif ($userType === 'enseignant') {
        $stmt = $conn->prepare("INSERT INTO enseignant (id_ens, nom_ens, prenom_ens, email_ens, grade_ens,stat) VALUES (?, ?, ?, ?, ?,'en attente')");
        $stmt->bind_param("sssss", $uid, $name, $prenom, $email, $grade);
    
    }

    if ($stmt->execute()) {
        echo json_encode(array('success' => true, 'message' => 'User inserted successfully.'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error: ' . $stmt->error));
    }

    $stmt->close();
    $conn->close();
} else {
    // If not a POST request, return an error message
    echo json_encode(array('success' => false, 'message' => 'Invalid Request'));
}
?>
