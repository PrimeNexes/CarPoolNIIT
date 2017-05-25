//Check current user
function userState(){
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

$(document).ready(function(){
 
  userState();  
    
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
userState();  
}); 
       
$("#signupform").submit(function(){
 event.preventDefault();
var email = document.getElementById('emailR').value;   
var password =   document.getElementById('passwordR').value;
var fullnameR =   document.getElementById('fullnameR').value; 
var addressR =   document.getElementById('addressR').value; 
try{
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
 Materialize.toast(error.message, 4000);
  // ...
});

var userId = firebase.auth().currentUser.uid;
firebase.database().ref('/Users/' + userId).set({
    
fullname:fullnameR,
address:addressR

});
userState(); 
}
catch(e){
    console.log(e);
}
finally{
    Materialize.toast("Done ! Now you will be logged in.", 4000);
    
}
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

