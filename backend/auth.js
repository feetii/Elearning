// auth.js

import { auth, db } from '../initialisefirebase.js';
import "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js";
import { Enseignant } from '../backend/modules/Enseignant.js';
import { Etudiant } from '../backend/modules/Etudiant.js';

document.addEventListener('DOMContentLoaded', function () {
    
    
        let radioEtudiant = document.querySelector(".radioEtudiant");
        let radioEnseignant = document.querySelector(".radioEnseignant");
        let divInfoEns = document.querySelector(".div-info-ENS");
        let matriculeEtd = document.querySelector(".matriculeEtd");
        let academicYearContainer = document.querySelector(".div-academic-year");
        let divinfoETD = document.querySelector(".div-info-ETD");
        // Assurez-vous de ne pas utiliser des guillemets autour de true
        radioEtudiant.checked = true;
        divInfoEns.style.display === 'none';
        // Utilize the checked property to check the initial state
 

        // Utilize the event listener to respond to clicks on radio buttons
        radioEnseignant.onclick = () => {
            if (radioEnseignant.checked) {
                divInfoEns.classList.add("div-info-ENS-on");
                divinfoETD.style.display = "none"
            }
        };
       
        //changment a etudiant
        radioEtudiant.onclick = () => {
            if (radioEtudiant.checked) {
                divinfoETD.style.display = "block"
                divInfoEns.classList.remove("div-info-ENS-on");  
            } 
        };

        
  
});
$('.close-btn').click(function(){
    $('.alert').removeClass("show");
    $('.alert').addClass("hide");
  });
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement
    let selectedType = document.querySelector('input[name="type"]:checked').value;
    var nom = document.getElementById('nom').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var prenom = document.getElementById('prenom').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var selectedAnnée = document.getElementById('Année').value;
    var matricule = document.getElementById('matricule').value;
    var grad = document.getElementById('grad').value;
    // Expression régulière pour l'e-mail
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let gradInput = document.getElementById('grad');
    let divInfoEns = document.querySelector(".div-info-ENS");
    // Assurez-vous que le champ "grad" n'a pas l'attribut "required" lorsqu'il est masqué
    if (divInfoEns.style.display === 'none') {
        gradInput.removeAttribute('required');
    }

    // Expression régulière pour le nom (au moins un caractère alphabétique)
    let nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

    // Expression régulière pour le numéro de carte à 12 chiffres
    let matriculeRegex = /^\d{12}$/;
    
    // Expression régulière pour le mot de passe (au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial)
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    

    // Effectuer la validation
    // Validation
    if (!nameRegex.test(nom)) {
        showAlert("Veuillez entrer un nom valide.");
        return false;
    }

    if (!nameRegex.test(prenom)) {
        showAlert("Veuillez entrer un prénom valide.");
        return false;
    }

    if (!emailRegex.test(email)) {
        showAlert("Veuillez entrer une adresse e-mail valide.");
        return false;
    }


    if (selectedType === 'etudiant' && !matriculeRegex.test(matricule)) {
        showAlert("Veuillez entrer un numéro de carte valide (12 chiffres) pour un étudiant.");
        return false;
    }

    if (selectedType === 'enseignant' && !grad) {
        showAlert("Veuillez entrer le grade pour un enseignant.");
        return false;
    }

    if (!passwordRegex.test(password)) {
        showAlert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
        return false;
    }

    if (password !== confirmPassword) {
        showAlert("Les mots de passe ne correspondent pas.");
        return false;
    }

    if (selectedAnnée === "") {
        showAlert("Veuillez sélectionner une année universitaire.");
        return false;
    }
    

   
    let User;

    // Create instance based on the selected type
    if (selectedType === 'etudiant') {
        // If "Etudiant" is checked
        User = new Etudiant(matricule,nom, prenom,selectedAnnée, email,);
        showAlert("etud cree");
        console.log(User)
    } else {
        // If "Enseignant" is checked
        User = new Enseignant(nom, prenom, email, grad);
        showAlert("ens cree");
        console.log(User)
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store user data in Firestore
            db.collection("users").doc(user.uid).set({
                name: nom,
                prenom:prenom,
                email: email,
                uid: user.uid,
                statu: "en attente",
                anne: selectedType === 'etudiant' ? selectedAnnée : null,
                grade: selectedType === 'enseignant' ? grad : null,
                matricule: selectedType === 'etudiant' ? matricule : null,
            })
                .then(() => {
                    console.log("Document successfully written!");
                    // Add a delay before redirecting
                    setTimeout(() => {
                        
                    }, 5000); // Adjust the delay time as needed

                    console.log('user cree');
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

            // Send data to your PHP script for processing
            fetch('../backend/php/auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${encodeURIComponent(nom)}&prenom=${encodeURIComponent(prenom)}&email=${encodeURIComponent(email)}&uid=${encodeURIComponent(user.uid)}&statu=en attente&anne=${encodeURIComponent(selectedType === 'etudiant' ? selectedAnnée : '')}&grade=${encodeURIComponent(selectedType === 'enseignant' ? grad : '')}&matricule=${encodeURIComponent(selectedType === 'etudiant' ? matricule : '')}&userType=${encodeURIComponent(selectedType)}`,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('PHP script response:', data);
                })
                .catch((error) => {
                    console.error('Error sending data to PHP script:', error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error creating Firebase user:', errorCode, errorMessage);
            console.log('Email:', email);
            console.log('db', db);
        });
});
// Function to show an alert
function showAlert(message) {
    const alert = $('.alert');
    alert.find('.msg').text(message);
    alert.addClass("show");
    alert.removeClass("hide");
    alert.addClass("showAlert");
    setTimeout(() => {
        alert.removeClass("show");
        alert.addClass("hide");
    }, 5000);
}


