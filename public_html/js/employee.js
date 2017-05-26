function setCar(carName, carType, noOfSeats) {
  var carId=firebase.database().ref('Car/').push().key;
  firebase.database().ref('Car/' + carId).set({
    carName: carName,
    carType: carType,
    noOfSeats: noOfSeats,
    isAvailable:true
  });
}
function getCar(){
    
 firebase.database().ref('Car/').on('child_added',function(snapshot){
  var carId=snapshot.val();
  $("#getCarToDelete").append(
            '<div class="row" id="'+snapshot.key+'">'+
                        '<div class="col s12 m12 l12">'+
                        '<div class="card blue-grey darken-1">'+
                        '<div class="card-content white-text">'+
                            '<span class="card-title">'+carId.carName+'</span>'+
                            '<p>Car Type : '+carId.carType+'<br/>'+
                            'No of Seats : '+carId.noOfSeats+'</p>'+
                        '</div>'+
                        '<div class="card-action">'+
                            '<a id="'+snapshot.key+'Delete" class="btn-flat">Delete</a>'+                         
                        '</div>'+
                       '</div>'+
                        '</div>'+
            '</div>'
  );
  
  $("#"+snapshot.key+"Delete").click(function(){
      try{
        firebase.database().ref('Car/'+snapshot.key).remove();
        $("#"+snapshot.key).remove();
        }
        catch(e){
        Materialize.toast("Error !", 4000);
        Materialize.toast(e, 4000);
        }
  });
  
  });    
};

function setCarpool(routeName,routeDistance,startLocation,endLocation,startDate,endDate,fare,noOfPassengers){
    var carpoolId=firebase.database().ref('Carpool/').push().key;
    firebase.database().ref('Carpool/'+carpoolId).set({
        routeName:routeName,
        routeDistance:routeDistance,
        startLocation:startLocation,
        endLocation:endLocation,
        startDate:startDate,
        endDate:endDate,
        fare:fare,
        noOfPassengers:noOfPassengers,
        isCanceled:false
    });
};

function getCarpoolData(){
    
 firebase.database().ref('Carpool/').on('child_added',function(snapshot){
  var carpoolId=snapshot.val();
  $("#getCarpoolToDelete").append(
            '<div class="row" id="'+snapshot.key+'">'+
                        '<div class="col s12 m12 l12">'+
                        '<div class="card blue-grey darken-1">'+
                        '<div class="card-content white-text">'+
                          '  <p>Route Name   :' +carpoolId.routeName+'<br/>'+
                            'Route Distance  :'+carpoolId.routeDistance+'<br/>'+
                            'Start Location  :'+carpoolId.startLocation+'<br/>'+
                            'End Location    :'+carpoolId.endLocation+'<br/>'+
                            'Start Date      :'+carpoolId.startDate+'<br/>'+
                            'End Date        :'+carpoolId.endDate+'<br/>'+
                            'Fare            :'+carpoolId.fare+'<br/>'+
                            'No of Passengers :'+carpoolId.noOfPassengers+'</p>'+
                        '</div>'+
                        '<div class="card-action">'+
                            '<a id="'+snapshot.key+'CarpoolDelete" class="btn-flat">Delete</a>'+                         
                        '</div>'+
                       '</div>'+
                        '</div>'+
            '</div>'
  );
$("#"+snapshot.key+"CarpoolDelete").click(function(){
      try{
        firebase.database().ref('Carpool/'+snapshot.key).remove();
        $("#"+snapshot.key).remove();
        }
        catch(e){
        Materialize.toast("Error !", 4000);
        Materialize.toast(e, 4000);
        }
  });
  
  });    
};

$(document).ready(function(){
    
getCar();
getCarpoolData();
$("#carForm").submit(function(event){
event.preventDefault();
var carName = document.getElementById('carname').value;   
var carType = document.getElementById('carType').value;
var noOfSeats = document.getElementById('noOfSeats').value;
try { 
    if(carName && carType&& noOfSeats)
    {
    setCar(carName, carType, noOfSeats);
    }
else{
    Materialize.toast("Enter all fields", 4000);
}
}
catch(e){
    console.log(e);
}
finally{
    Materialize.toast("Car Added", 4000);
    $('#carForm').trigger("reset");
}
});

$("#carpoolForm").submit(function(event){
event.preventDefault();
var routeName = document.getElementById('routeName').value;   
var routeDistance = document.getElementById('routeDistance').value;
var startLocation=document.getElementById('startLocation').value;
var endLocation=document.getElementById('endLocation').value;
var startDate=document.getElementById('startDate').value;
var endDate=document.getElementById('endDate').value;
var fare=document.getElementById('fareCarPool').value;
var noOfPassengers = document.getElementById('noOfPassengers').value;
console.log(routeName,routeDistance,startLocation,endLocation,startDate,endDate,fare,noOfPassengers);
try { 
    if(routeName && routeDistance && startLocation && endLocation && startDate && endDate && fare && noOfPassengers)
    {
    setCarpool(routeName,routeDistance,startLocation,endLocation,startDate,endDate,fare,noOfPassengers);
    }
    else{
    Materialize.toast("Enter all fields", 4000);
    }
}
catch(e){
    console.log(e);
}
finally{
    Materialize.toast("Booking successful", 4000);
    $('#carpoolForm').trigger("reset");
}
});

//Init or Update select
$('select').material_select();});

 $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

