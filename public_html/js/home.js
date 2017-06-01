function getRentCar(){
$("#rentWindow").html("");
firebase.database().ref('RentService/').on('child_added',function(getRent){
firebase.database().ref('Car/'+getRent.val().carId).on('value',function(snapshot){
  var carId=snapshot.val();
  if(getRent.val().isAvailable === true && $('#'+snapshot.key+'RentCard').length === 0){
  $("#rentWindow").append(
            '<div class="row" id="'+snapshot.key+'RentCard">'+
                        '<div class="col s12 m12 l12">'+
                        '<div class="card blue-grey darken-1">'+
                        '<div class="card-content white-text">'+
                            '<span class="card-title">'+carId.carName+'</span>'+
                            '<p>Car Type : '+carId.carType+'<br/>'+
                            'No of Seats : '+carId.noOfSeats+'<br/>'+
                            'Fare : '+getRent.val().fare+'</p>'+
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
        if(getRent.val().isAvailable === true){
        try{
            
            setROrder(getRent.key,snapshot.key,carId.carName,carId.carType,carId.noOfSeats,getRent.val().fare,"RentService");
            firebase.database().ref('RentService/' + getRent.key+'/isAvailable').set(false);
            
        }
        catch(e)
        {
         console.log(e);
         Materialize.toast("Error.Try again or refresh the page", 4000);
        }
        finally{
        $('#'+snapshot.key+'Book').modal('close');
        $("#"+snapshot.key+"RentCard").remove();       
        Materialize.toast("Success.Check your order in 'My Order'.", 4000);
        }};
     });
    
    }
    });
    });
};

function getCarpool(){
$("#poolWindow").html("");
firebase.database().ref('CarpoolService/').on('child_added',function(getCarpool){
  if(getCarpool.val().isAvailable === true && $('#'+getCarpool.key+'RentCard').length === 0 ){
  $("#poolWindow").append(
            '<div class="row" id="'+getCarpool.key+'CarpoolCard">'+
                        '<div class="col s12 m12 l12">'+
                        '<div class="card blue-grey darken-1">'+
                        '<div class="card-content white-text">'+
                            '<span class="card-title">'+getCarpool.val().routeName+'</span>'+
                            'No of Seats per car : '+getCarpool.val().noOfPassengers+'<br/>'+
                            'Fare : '+getCarpool.val().fare+'</p>'+
                        '</div>'+
                        '<div class="card-action">'+
                        '<a href="#'+getCarpool.key+'BookC" class="modal-trigger waves-effect waves-blue btn-flat">Book</a>'+
                        '<div id="'+getCarpool.key+'BookC" class="modal modal-fixed-footer">'+
                            '<div class="modal-content">'+
                            '<h4>Book car</h4>'+
                            '<p>A bunch of text</p>'+
                            '</div>'+
                            '<div class="modal-footer">'+
                            '<a id="'+getCarpool.key+'BookConfirmC" class="modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>'+
                            '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
            '</div>');    
    
    $('#'+getCarpool.key+'BookC').modal();
    
    $('#'+getCarpool.key+'BookConfirmC').click(function(){
        if(getCarpool.val().isAvailable === true){
        try{            
            setCOrder(getCarpool.key,getCarpool.val().fare,"CarpoolService");           
        }
        catch(e)
        {
         console.log(e);
         Materialize.toast("Error.Try again or refresh the page", 4000);
        }
        finally{
        $('#'+getCarpool.key+'BookC').modal('close');
        $("#"+getCarpool.key+"CarpoolCard").remove();       
        Materialize.toast("Success.Check your order in 'My Order'.", 4000);
        }};
     });
    
    }
    });
};

function setROrder(serviceId,carId,carName,carType,noOfSeats,fare,orderType){
    firebase.auth().onAuthStateChanged(function(user) {
    // User is signed in.
    if (user) {
        
        var date = getDate();
        var userId=user.uid;
        var orderId=firebase.database().ref('Order/').push().key;
        firebase.database().ref('Order/' + orderId).set({
        serviceId: serviceId,
        car:{
          carId:carId,
          carName:carName,
          carType:carType,
          noOfSeats:noOfSeats
        },
        fare:fare,
        orderType: orderType,
        userId: userId,
        status: 'Processing',
        date:date,
        isCanceled:false,
        hasInvoice:false
        });
        } else {
        window.location.href ="./index.html";
        // No user is signed in.
        }
    });
}
function setCOrder(serviceId,fare,orderType){
    firebase.auth().onAuthStateChanged(function(user) {
    // User is signed in.
    if (user) {
        
        var date = getDate();
        var userId=user.uid;
        var orderId=firebase.database().ref('Order/').push().key;
        firebase.database().ref('Order/' + orderId).set({
        serviceId: serviceId,
        fare:fare,
        orderType: orderType,
        userId: userId,
        status: 'Processing',
        date:date,
        isCanceled:false,
        hasInvoice:false
        });
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
  $("#rentWindow").append(
            '<div class="row" id="'+snapshot.key+'RentCard">'+
                        '<div class="col s12 m12 l12">'+
                        '<div class="card blue-grey darken-1">'+
                        '<div class="card-content white-text">'+
                            '<span class="card-title">'+carId.carName+'</span>'+
                            '<p>Car Type : '+carId.carType+'<br/>'+
                            'No of Seats : '+carId.noOfSeats+'<br/>'+
                            'Fare : '+getRent.val().fare+'</p>'+
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
        if(getRent.val().isAvailable === true){
        try{
            
            setROrder(getRent.key,snapshot.key,carId.carName,carId.carType,carId.noOfSeats,getRent.val().fare,"RentService");
            firebase.database().ref('RentService/' + getRent.key+'/isAvailable').set(false);
            
        }
        catch(e)
        {
         console.log(e);
         Materialize.toast("Error.Try again or refresh the page", 4000);
        }
        finally{
        $('#'+snapshot.key+'Book').modal('close');
        $("#"+snapshot.key+"RentCard").remove();       
        Materialize.toast("Success.Check your order in 'My Order'.", 4000);
        }};
     });
    
    }
        });      
};

$(document).ready(function(){
//Check current user on ready
userState();  
//Get all Car      
getRentCar();
getCarpool();
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
//Dropdown Init
$(".dropdown-button").dropdown();

});
