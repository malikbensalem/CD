
$(window).on('load', function() {
  $.ajax({
    url: "libs/php/getLD.php",
    type: 'POST',
    dataType: 'json',
    success: function(result) {
      fillLocationSele();  
      popSel(result['data']['department']);
    }
  })
})

function resetSele(iid,item){
  $.ajax({
    url: "libs/php/get"+item+".php",
    type: "POST",
    dataType: "json",
    success:function(result){
      op = document.createElement("option");
      op.appendChild(document.createTextNode(result['data'][item][result['data'][item].length-1]['name']));
      op.value=result['data'][item][result['data'][item].length-1]['id'];
      document.getElementById(iid).appendChild(op);
    }
  })
}
function popSel(res,iid="department") {
  res.forEach(element => {
    op = document.createElement("option");
    op.appendChild(document.createTextNode(element['name']));
    op.value=element['id'];
    document.getElementById(iid).appendChild(op);
  });
}

function insertLocation(){
  if ($("#location").val()&&!$("#location").val().split(/[ a-zA-Z \-]/).join(""))
  $.ajax({
    url: "libs/php/insertLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      lame: $("#location").val(),
      },
    success: function(result){
      flashColour(document.getElementById("location").parentElement.parentElement.parentElement,"limegreen");  
      resetSele("locationSele","locations");
    },
    error:function(result, textStatus, xhr){
      flashColour(document.getElementById("location").parentElement.parentElement.parentElement);
    }
  });
  else{
    flashColour(document.getElementById("location").parentElement.parentElement.parentElement,"#ffcc00");
  }
}
function fillLocationSele(){
  $.ajax({
    url: "libs/php/getLocations.php",
    type: "POST",
    dataType: "json",
    success:function(result){
      popSel(result['data']['locations'],"locationSele")
    }
  })
}
function flashColour(e,cc="mediumvioletred"){
  //limegreen
  //#ffcc00
  e.style.borderColor = cc;
  setTimeout(() => e.style.borderColor = "lightgray", 1000);
}
function insertDepartment(){
  if ($("#dep").val()&&!$("#dep").val().split(/[ a-zA-Z \-]/).join("")){
  $.ajax({
    url: "libs/php/insertDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      dame: $("#dep").val(),
      lid: $("#locationSele").val(),
    },
    success: function(result){
      flashColour(document.getElementById("dep").parentElement.parentElement.parentElement,"limegreen");  
      resetSele("department","departments");
    },
    error:function(result, textStatus, xhr){     
      flashColour(document.getElementById("dep").parentElement.parentElement.parentElement);  
    }
  })
}else{
  flashColour(document.getElementById("dep").parentElement.parentElement.parentElement,"#ffcc00");  
}
}
function addPersonnel(){
  if ($("#fame").val()&&$("#lame").val()&&$("#job").val()&&$("#email").val()){
    if ($("#email").val().match(/\S+@\S+\.\S+/)&&!$("#fame").val().split(/[ a-zA-Z \-]/).join("")&&!$("#lame").val().split(/[ a-zA-Z \-]/).join("")&&!$("#job").val().split(/[ a-zA-Z \-]/).join("")){
  $.ajax({
    url: "libs/php/insertPersonnel.php",
    type: "POST",
    dataType: "json",
    data: {
      fame: $("#fame").val(),
      lame: $("#lame").val(),
      jobTitle: $("#job").val(),
      email: $("#email").val(),
      department: $("#department").val()
    },
    success: function(result){
      flashColour(document.getElementById("fame").parentElement.parentElement.parentElement,"limegreen");  

    },
    error:function(result, textStatus, xhr){
      flashColour(document.getElementById("fame").parentElement.parentElement.parentElement);  
    }
  });
}
else{ 
  flashColour(document.getElementById("fame").parentElement.parentElement.parentElement,"#ffcc00");  

}
}else{
  flashColour(document.getElementById("fame").parentElement.parentElement.parentElement,"#ffcc00");  
}
}