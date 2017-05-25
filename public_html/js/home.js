function getRentCar(){
 firebase.database().ref('Car/').on('child_added',function(snapshot){
  var carId=snapshot.val();
  if(carId.isAvailable === true){
  $("#rentWindow").append(
            '<div class="row" id="'+snapshot.key+'RentCard">'+
                        '<div class="col s12 m12 l12">'+
                        '<div class="card blue-grey darken-1">'+
                        '<div class="card-content white-text">'+
                            '<span class="card-title">'+carId.carName+'</span>'+
                            '<p>Car Type : '+carId.carType+'<br/>'+
                            'No of Seats : '+carId.noOfSeats+'</p>'+
                        '</div>'+
                        '<div class="card-action">'+
                        '<a href="#'+snapshot.key+'Book" class="modal-trigger waves-effect waves-blue btn-flat">Book</a>'+
                        '<div id="'+snapshot.key+'Book" class="modal modal-fixed-footer">'+
                            '<div class="modal-content">'+
                            '<h4>Book car</h4>'+
                            '<p>A bunch of text</p>'+
                            '</div>'+
                            '<div class="modal-footer">'+
                            '<a id="'+snapshot.key+'BookConfirm" class="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>'+
                            '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
            '</div>');    
    
    $('#'+snapshot.key+'Book').modal();
    
    $('#'+snapshot.key+'BookConfirm').click(function(){
        try{
            if(carId.isAvailable===true){
            setOrder(snapshot.key);}
        }
        catch(e)
        {
         console.log(e);
         Materialize.toast("Error. Try again", 4000);
        }
        finally{
        $('#'+snapshot.key+'Book').modal('close');
        $("#"+snapshot.key+"RentCard").remove();       
        Materialize.toast("Success.Check your order in 'My Order'.", 4000);
        }
     });
    
    }
    });
};

function setOrder(carId){
    firebase.auth().onAuthStateChanged(function(user) {
    // User is signed in.
    if (user) {
        var userId=user.uid;
        var orderId=firebase.database().ref('Order/').push().key;
        firebase.database().ref('Order/' + orderId).set({
        carId: carId,
        userId: userId,
        status: 'Processing'
        });
        firebase.database().ref('Car/' + carId+'/isAvailable').set(false);
        } else {
        window.location.href ="./index.html";
        // No user is signed in.
        }
    });
}

function searchRentCar(type){
  $("#rentWindow").html('');
  firebase.database().ref('Rent/Car/').on('child_added',function(snapshot){
  var carId=snapshot.val();
  if(carId.carType === type && carId.isAvailable === true){ 
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
      console.log("Logged in "+user.email);
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

$(".signout").click(function(){   
    
    firebase.auth().signOut().then(function() {
    Materialize.toast("Signout", 4000);
    }).catch(function(error) {
    Materialize.toast("Error : "+error, 4000);
    });  
    
});


$(".dropdown-button").dropdown();

$(".button-collapse").sideNav();


});

