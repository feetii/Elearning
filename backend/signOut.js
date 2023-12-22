
import { auth} from '/globale.js';

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('logout').addEventListener('click', function() {
     auth.signOut().then(function() {
          // Sign-out successful.
          console.log('User signed out successfully');
          window.location.href='../index.html'
      }).catch(function(error) {
          // An error happened.
          console.error('Error signing out:', error);
      });
  });
  });