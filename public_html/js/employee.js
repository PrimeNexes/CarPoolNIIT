function setRentCar(carName, carType, noOfSeats) {
  var carId=firebase.database().ref('Rent/Car/').push().key;
  firebase.database().ref('Rent/Car/' + carId).set({
    carName:carName,
    carType: carType,
    noOfSeats: noOfSeats
  });
}

function getCarData(){
    
 firebase.database().ref('Rent/Car/').on('child_added',function(snapshot){
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
                            '<a id="'+snapshot.key+'Delete">Delete</a>'+                         
                        '</div>'+
                       '</div>'+
                        '</div>'+
            '</div>'
  );
  
  $("#"+snapshot.key+"Delete").click(function(){
      try{
        firebase.database().ref('Rent/Car/'+snapshot.key).remove();
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
getCarData();
$("#carForm").submit(function(event){
event.preventDefault();
var carName = document.getElementById('carname').value;   
var carType = document.getElementById('carType').value;
var noOfSeats = document.getElementById('noOfSeats').value;
try { 
    if(carName && carType&& noOfSeats)
    {
    setRentCar(carName, carType, noOfSeats);
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

//Init or Update select
$('select').material_select();});

