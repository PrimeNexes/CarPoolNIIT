function getRentCar(){
 firebase.database().ref('Rent/Car/').on('child_added',function(snapshot){
  var carId=snapshot.val();
  $("#rentWindow").append('<div class="row">'+
                        '<div class="col s12 m12 l12">'+
                        '<div class="card blue-grey darken-1">'+
                        '<div class="card-content white-text">'+
                            '<span class="card-title">'+carId.carName+'</span>'+
                            '<p>Car Type :'+carId.carType+'<br/>'+
                            'No of Seats :'+carId.noOfSeats+'</p>'+
                        '</div>'+
                        '<div class="card-action">'+
                            '<a href="">Book</a>'+                         
                        '</div>'+
                       '</div>'+
                        '</div>'+
                    '</div>');
            });
};

function searchRentCar(type){
  $("#rentWindow").html('');
  firebase.database().ref('Rent/Car/').on('child_added',function(snapshot){
  var carId=snapshot.val();
  if(carId.carType === type){ 
  $("#rentWindow").append('<div class="row">'+
                        '<div class="col s12 m12 l12">'+
                        '<div class="card blue-grey darken-1">'+
                        '<div class="card-content white-text">'+
                            '<span class="card-title">'+carId.carName+'</span>'+
                            '<p>Car Type : '+carId.carType+'<br/>'+
                            'No of Seats : '+carId.noOfSeats+'</p>'+
                        '</div>'+
                        '<div class="card-action">'+
                            '<a href="">Book</a>'+                         
                        '</div>'+
                       '</div>'+
                        '</div>'+
                    '</div>');
        }
        });      
};

function userState(){
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

$(document).ready(function(){
//Check current user on ready
userState();   
//Get all Car      
getRentCar();
//Search Car
$("#carH").click(function(){
        searchRentCar('Hatchback');
});
$("#carS").click(function(){
        searchRentCar('Sedan');
});
$("#carMPV").click(function(){
        searchRentCar('MPV');
});
$("#carSUV").click(function(){
        searchRentCar('SUV');
});
$("#carCross").click(function(){
        searchRentCar('Crossover');
});
$("#carCoupe").click(function(){
        searchRentCar('Coupe');
});
$("#carConvert").click(function(){
        searchRentCar('Convertible');
});
$("#carAll").click(function(){
        $("#rentWindow").html('');
        getRentCar();
});
$(".dropdown-button").dropdown();

$(".button-collapse").sideNav();





$(".signout").click(function(){   
    
    firebase.auth().signOut().then(function() {
    Materialize.toast("Signout", 4000);
    }).catch(function(error) {
    Materialize.toast("Error : "+error, 4000);
    
});
    
});
});

