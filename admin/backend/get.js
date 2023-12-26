  
    import { auth, db } from '../../initialisefirebase.js';
    
    console.log("Script JavaScript exécuté !");
    // Fonction pour récupérer la liste des étudiants en attente
    // Fonction pour récupérer la liste des étudiants en attente
    var urlParams = new URLSearchParams(window.location.search);
    var idEtud = urlParams.get('iduser');
    
   
    function getEtudiantsEnAttente() {
        // Check if the DOMContentLoaded event is firing
        document.addEventListener('DOMContentLoaded', function () {
            console.log("DOM content loaded!");
    
            // Try a simple fetch to see if the backend script is reachable
            fetch('backend/getEtudNV.php')
                .then(response => response.json())
                .then(data => {
                    console.log('Data from backend:', data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });
        console.log("id user envoyyyyy ");
        console.log(idEtud);
        console.log("Function getEtudiantsEnAttente executed!");
        fetch('backend/getEtudNV.php')
            .then(response => response.json())
            .then(etudiants => {
                console.log('Liste des étudiants en attente récupérée:', etudiants);
            
                // Construct the HTML list with validation buttons
                let etudiantsListHTML = '<ul>';
                etudiants.forEach(etudiant => {
                    etudiantsListHTML += `<li>${etudiant.nom_etu} ${etudiant.prenom_etu} <button class="valider-btn" data-id="${etudiant.id_etu}">Valider</button></li>`;
                });
                etudiantsListHTML += '</ul>';
                document.getElementById('etudiants-list').innerHTML = etudiantsListHTML;
            
                // Attach event listener using event delegation
                document.getElementById('etudiants-list').addEventListener('click', function(event) {
                    const target = event.target;
            
                    // Check if the clicked element is a "Valider" button
                    if (target.classList.contains('valider-btn')) {
                        const idEtudiant = target.getAttribute('data-id');
                        validerEtudiant(idEtudiant)
                            .then(() => {
                                // Update the interface or reload the list
                                getEtudiantsEnAttente();
                            })
                            .catch(error => console.error('Error validating student:', error));
                    }
                });
            })
            .catch(error => console.error('Error retrieving students in waiting:', error));
            
    }
    // Fonction pour valider un étudiant
    // Function to validate a student
    function validerEtudiant(idEtudiant) {
        fetch('backend/valider_etudiant.php?id=' + idEtudiant)
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    console.log('Student validated successfully. Server response:', response);
    
                    // Update Firestore document
                    const userDocRef = db.collection('users').doc(idEtudiant);
                    return userDocRef.update({
                        stat: 'valide'
                    });
                } else {
                    console.error('Error validating student. Server response:', response);
                    alert('Error validating student.');
                }
            })
            .then(() => {
                // Update the interface or reload the list
                getEtudiantsEnAttente();
            })
            .catch(error => console.error('Error validating student:', error));
    }
    getEtudiantsEnAttente();
    // Reload every 3 seconds

   

    setInterval(() => {
    getEtudiantsEnAttente();
}, 3000);
   
