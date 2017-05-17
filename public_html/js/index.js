$(document).ready(function(){
    
//Check current user
var userState = function (){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      window.location.href ="./home.html";
      Materialize.toast("Logged in", 4000);
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
};

//Check current user on ready
userState();   
//

$("#loginform").submit(function(event){
event.preventDefault();
var email = document.getElementById('emailL').value;   
var password =   document.getElementById('passwordL').value; 
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  Materialize.toast(errorMessage, 4000);
  
});
}); 
       
$("#signupform").submit(function(){
 event.preventDefault();
var email = document.getElementById('emailR').value;   
var password =   document.getElementById('passwordR').value; 
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
 Materialize.toast(error.message, 4000);
  // ...
});
});

$("#fogotPassBtn").click(function(){
    var email = document.getElementById('emailL').value;
    if(email)
    {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            Materialize.toast("Check you mail then comeback here.", 4000);
            }, function(error) {
             Materialize.toast(error.message, 4000);
        });
        
        
    }
    else{ 
       $( "#emailL" ).focus();
       Materialize.toast("Type your email of the forgotten account above", 4000); 
    }
    
});

});

