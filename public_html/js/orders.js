$(document).ready(function(){


$(".button-collapse").sideNav();




$(".signout").click(function(){
    
firebase.auth().signOut().then(function() {
   Materialize.toast("Signout", 4000);
}).catch(function(error) {
  // An error happened.
});
    
});
});


