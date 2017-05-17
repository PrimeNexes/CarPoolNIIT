$(document).ready(function(){
//Check current user
var userState = function (){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {     
      Materialize.toast("Logged in", 4000);
    // User is signed in.
  } else {
      window.location.href ="./index.html";
    // No user is signed in.
  }
});
};

$(".dropdown-button").dropdown();

$(".button-collapse").sideNav();



//Check current user on ready
userState();   
//

$(".signout").click(function(){
    
    firebase.auth().signOut().then(function() {
   Materialize.toast("Signout", 4000);
}).catch(function(error) {
  // An error happened.
});
    
});
});

