  
    import { auth, db } from '../../initialisefirebase.js';
    
    console.log("Script JavaScript exécuté !");
    // Fonction pour récupérer la liste des étudiants en attente
    // Fonction pour récupérer la liste des étudiants en attente
    var urlParams = new URLSearchParams(window.location.search);
    var idEtud = urlParams.get('iduser');
    
   
    function getEnsEnAttente() {
        // Check if the DOMContentLoaded event is firing
        document.addEventListener('DOMContentLoaded', function () {
            console.log("DOM content loaded!");
    
            // Try a simple fetch to see if the backend script is reachable
            fetch('backend/getEnsNV.php')
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
        fetch('backend/getEnsNV.php')
            .then(response => response.json())
            .then(enseignants => {
                console.log('Liste des enseignants en attente récupérée:', enseignants);
            
                // Construct the HTML list with validation buttons
                let enseignantsListHTML = '<ul>';
                enseignants.forEach(enseignant => {
                    enseignantsListHTML += `
                        <li>
                            ${enseignant.nom_ens} ${enseignant.prenom_ens} ${enseignant.email_ens} ${enseignant.grade_ens}
                            <button class="valider-btn" data-id="${enseignant.id_ens}">Valider</button>
                        </li>`;
                });
                enseignantsListHTML += '</ul>';
            
                // Display the HTML list in the 'ens-list' element
                const ensListContainer = document.getElementById('ens-list');
                ensListContainer.innerHTML = enseignantsListHTML;
                // Attach event listener using event delegation
                document.getElementById('ens-list').addEventListener('click', function(event) {
                    const target = event.target;
            
                    // Check if the clicked element is a "Valider" button
                    if (target.classList.contains('valider-btn')) {
                        const idEns = target.getAttribute('data-id');
                        validerEns(idEns)
                            .then(() => {
                                // Update the interface or reload the list
                               getEnsEnAttente();
                            })
                            .catch(error => console.error('Error validating ens:', error));
                    }
                });
            })
            .catch(error => console.error('Error retrieving ens in waiting:', error));
            
    }
    // Fonction pour valider un enseignant
  
    function  validerEns(idEns) {
        fetch('backend/valider_ens.php?id=' + idEns)
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    console.log('ENSEIGNANT validated successfully. Server response:', response);
    
                    // Update Firestore document
                    const userDocRef = db.collection('users').doc(idEns);
                    return userDocRef.update({
                        stat: 'valide'
                    });
                } else {
                    console.error('Error validating ens. Server response:', response);
                    alert('Error validating ens.');
                }
            })
            .then(() => {
                // Update the interface or reload the list
                getEnsEnAttente();
            })
            .catch(error => console.error('Error validating ens:', error));
    }
   getEnsEnAttente();
    // Reload every 3 seconds

   

    setInterval(() => {
    getEnsEnAttente
}, 3000);
   
