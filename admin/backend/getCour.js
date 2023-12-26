  
    
    
    
    console.log("Script JavaScript exécuté !");
    // Fonction pour récupérer la liste des étudiants en attente
    // Fonction pour récupérer la liste des étudiants en attente
    var urlParams = new URLSearchParams(window.location.search);
    var idEtud = urlParams.get('iduser');
    
   
    function getCoursEnAttente() {
        // Check if the DOMContentLoaded event is firing
        document.addEventListener('DOMContentLoaded', function () {
            console.log("DOM content loaded!");
    
            // Try a simple fetch to see if the backend script is reachable
            fetch('backend/getCou.php')
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
        fetch('backend/getCou.php')
            .then(response => response.json())
            .then(cours => {
                console.log('Liste des étudiants en attente récupérée:', cours);
            
                // Construct the HTML list with validation buttons
                let coursListHTML = '<ul>';
                cours.forEach(cour => {
                    coursListHTML += `<li>${cour.titre_cours} ${cour.info_cours}${cour.id_cours} <button class="valider-btn" data-id="${cour.id_cours}">Valider</button></li>`;
                });
                coursListHTML += '</ul>';
                document.getElementById('cours-list').innerHTML = coursListHTML;
            
                // Attach event listener using event delegation
                document.getElementById('cours-list').addEventListener('click', function(event) {
                    const target = event.target;
            
                    // Check if the clicked element is a "Valider" button
                    if (target.classList.contains('valider-btn')) {
                        const idCour = target.getAttribute('data-id');
                        validerCour(idCour)
                            .then(() => {
                                // Update the interface or reload the list
                               getCoursEnAttente();
                            })
                            .catch(error => console.error('Error validating cour:', error));
                    }
                });
            })
            .catch(error => console.error('Error retrieving students in waiting:', error));
            
    }
    // Fonction pour valider un étudiant
    // Function to validate a student
    function validerCour(idcour) {
        console.log('cour a vzlid'+idcour);
        fetch('backend/valider_cour.php?id=' + idcour)
            .then(response => response.json())
            .then(response => {
                console.log('Server response:', response);
    
                if (response.success) {
                    console.log('Course validated successfully.');
                } else {
                    console.error('Error validating course. Server response:', response);
                    alert('Error validating course.');
                }
            })
            .then(() => {
                // Update the interface or reload the list
                getCoursEnAttente();
            })
            .catch(error => console.error('Error validating course:', error));
    }
    
    getCoursEnAttente();
    setInterval(() => {
       getCoursEnAttente();
    }, 3000);
    
   
    