

import { auth, db } from '../initialisefirebase.js';
import "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js";
import { Enseignant } from '../backend/modules/Enseignant.js';
import { Etudiant } from '../backend/modules/Etudiant.js';


document.getElementById('loginform2').addEventListener('submit', function (event) {
    event.preventDefault();

    var loginEmail = document.getElementById('loginEmail').value;
    var loginPassword = document.getElementById('passwordLogin').value;
     console.log(loginEmail);
     console.log(loginPassword);
    auth.signInWithEmailAndPassword(loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user;

            // Récupérer les données de l'utilisateur depuis Firestore
            db.collection("users").doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const userStatus = doc.data().statu;
                        const userGrad=doc.data().grade;

                        if (userStatus === 'valide') {
                            // Rediriger vers la page si le statut est validé
                            console.log('Logged in User:', user);
                            if(userGrad===null){
                                var id =user.uid;
                                window.location.href = "etudiant/hommEtu.html?iduser="+id;
                                console.log('Logged in User:', user);
                                console.log('id User:', user.uid);   
                            }
                             else if(userGrad==='admin'){
                                var id =user.uid;
                                window.location.href = "admin/hommAdmin.html?iduser="+id;
                                console.log('Logged in User:', user);
                                console.log('id User:', user.uid);   
                            }else {
                                var id =user.uid;
                                window.location.href = "enseignant/hommEns.html?iduser="+id;
                                console.log('Logged in User:', user);
                                console.log('id User:', user.uid);   
                            }
                            
                        } else if (userStatus === 'en attente') {
                            showAlert("Le compte n\'est pas encore validé par l\'administrateur.")
                            alert("Le compte n\'est pas encore validé par l\'administrateur.");
                            console.log('Le compte n\'est pas encore validé par l\'administrateur.');
                            // Afficher le message si le compte est en attente
                            
                        } else if (userStatus === 'refuse') {
                            alert("Your account has been refused by the admin. Please contact support for further assistance.");
                            console.log('Your account has been refused by the admin. Please contact support for further assistance.');
                            // Afficher le message si le compte est refusé
                           
                        }
                    } else {
                        alert("Aucune donnée utilisateur trouvée..");
                        console.log('Aucune donnée utilisateur trouvée.');
                    }
                })
                .catch((error) => {
                    console.log('Erreur lors de la récupération du statut utilisateur:', error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error signing in:', errorCode, errorMessage);
        });
});
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
