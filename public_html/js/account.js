function userState(){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {     
      Materialize.toast("Logged in", 4000);
      currentuser=user;
  } else {
      window.location.href ="./index.html";
    // No user is signed in.
  }
});

}

function getEmail(){
  
firebase.auth().onAuthStateChanged(function(user) {     
        $("#profileEmail").html(user.email);      
});    
}

function getFullname(){   
firebase.auth().onAuthStateChanged(function(user) {   
    firebase.database().ref('/Users/' + user.uid).once('value').then(function(snapshot) {
    $("#profileName").html(snapshot.val().fullname);
    // ...
    });
});

}

function getAddress(){   
firebase.auth().onAuthStateChanged(function(user) {   
    
    firebase.database().ref('/Users/' + user.uid).once('value').then(function(snapshot) {
    $("#profileAddress").html(snapshot.val().address);
    // ...
    });
});

}

function setAddress(){
    
    firebase.auth().onAuthStateChanged(function(user) { 
        
    var profileaddress = document.getElementById('profileAddress').value;
    try{
        firebase.database().ref('/Users/' + user.uid).child('address').set(profileaddress);
    }
    catch(e){
        console.log(e);
    }
    finally{
        Materialize.toast("Profile Updated", 4000);
    }
    
    }); 

}
$(document).ready(function(){


getFullname();
getEmail();
getAddress();

$("#profileUpdateBtn").click(function(){
    setAddress();
});

$("#profileDeleteAgree").click(function(){
    firebase.auth().onAuthStateChanged(function(user) { 

    user.delete().then(function() {
    Materialize.toast("Profile Deleted", 4000);
    }, function(error) {
    Materialize.toast(error.message, 4000);
    });
         
    }); 
});


$(".signout").click(function(){   
    
    firebase.auth().signOut().then(function() {
    Materialize.toast("Signout", 4000);
    }).catch(function(error) {
    Materialize.toast("Error : "+error, 4000);
    
});
    
});


$(".button-collapse").sideNav();

$('.modal').modal();

});

