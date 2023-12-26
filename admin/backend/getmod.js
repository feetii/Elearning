  
    
    
    
    console.log("Script JavaScript exécuté !");
    // Fonction pour récupérer la liste des étudiants en attente
    // Fonction pour récupérer la liste des étudiants en attente
    var urlParams = new URLSearchParams(window.location.search);
    var idEtud = urlParams.get('iduser');
    
   
    function getModEnAttente() {
        // Check if the DOMContentLoaded event is firing
        document.addEventListener('DOMContentLoaded', function () {
            console.log("DOM content loaded!");
    
            // Try a simple fetch to see if the backend script is reachable
            fetch('backend/getMod.php')
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
        console.log("Function getCoursEnAttente executed!");
        fetch('backend/getMod.php')
            .then(response => response.json())
            .then(moduls => {
                console.log('Liste des moduls en attente récupérée:', moduls);
            
                // Construct the HTML list with validation buttons
                let modulsListHTML = '<ul>';
                moduls.forEach(module => {
                    modulsListHTML += `<li>${module.nom_module} ${module.desc_mod}$ <button class="valider-btn" data-id="${module.id_module}">Valider</button></li>`;
                });
                modulsListHTML += '</ul>';
                document.getElementById('moduls-list').innerHTML =  modulsListHTML;
            
                // Attach event listener using event delegation
                document.getElementById('moduls-list').addEventListener('click', function(event) {
                    const target = event.target;
            
                    // Check if the clicked element is a "Valider" button
                    if (target.classList.contains('valider-btn')) {
                        const idMod = target.getAttribute('data-id');
                        validerMod(idMod)
                            .then(() => {
                                // Update the interface or reload the list
                               getModEnAttente();
                            })
                            .catch(error => console.error('Error validating modul:', error));
                    }
                });
            })
            .catch(error => console.error('Error retrieving moduls in waiting:', error));
            
    }
    // Fonction pour valider un étudiant
    // Function to validate a student
    function validerMod(idMod) {
        console.log('cour a vzlid'+idMod);
        fetch('backend/valider_module.php?id=' + idMod)
            .then(response => response.json())
            .then(response => {
                console.log('Server response:', response);
    
                if (response.success) {
                    console.log('Modul validated successfully.');
                } else {
                    console.error('Error validating modules. Server response:', response);
                    alert('Error validating Moduls');
                }
            })
            .then(() => {
                // Update the interface or reload the list
                getModEnAttente();
            })
            .catch(error => console.error('Error validating modul:', error));
    }
    
    getModEnAttente();
    setInterval(() => {
      getModEnAttente();
    }, 3000);
    
   
    