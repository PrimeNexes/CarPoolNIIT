$(document).ready(function(){
    
$("#loginform").submit(function(){
var email = document.getElementById('emailL').value;   
var password =   document.getElementById('passwordL').value; 
firebase.auth().signInWithEmailAndPassword(email, password).then(
        Materialize.toast("Logged in", 4000)
            
            ).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  Materialize.toast(errorMessage, 4000);
  // ...
});
}); 
       
$("#signupform").submit(function(){
var email = document.getElementById('emailR').value;   
var password =   document.getElementById('passwordR').value; 
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
 Materialize.toast(errorMessage, 4000);
  // ...
});
});
});

