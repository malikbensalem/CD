
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
function flashColour(txt="ERROR: Somethig went wrong",cc="mediumvioletred",img="https://i.ibb.co/GHhYS5Y/error.png"){
  document.getElementById('confirmation').style.display = "block";
  document.getElementById('confirmation').style.backgroundColor = cc;
  document.getElementById('confirmationTxt').innerHTML=txt;
  document.getElementById('confirmationImg').src=img;

  setTimeout(() => document.getElementById('confirmation').style.display = "none", 5000);
}

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
      flashColour(result['status']['description'],"limegreen",'https://i.ibb.co/ZmTDCrz/success.png');  
      resetSele("locationSele","locations");
    },
    error:function(){
      flashColour();
    }
  });
  else{
    flashColour('INVALID: Errounous Input',"#daae00",'https://i.ibb.co/88G1M9M/invalid.png');
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
      flashColour(result['status']['description'],"limegreen",'https://i.ibb.co/ZmTDCrz/success.png');  
      resetSele("department","departments");
    },
    error:function(){     
      flashColour();  
    }
  })
}else{
  flashColour('INVALID: Errounous Input',"#daae00",'https://i.ibb.co/88G1M9M/invalid.png');  
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
      flashColour(result['status']['description'],"limegreen",'https://i.ibb.co/ZmTDCrz/success.png');  

    },
    error:function(){
      flashColour();  
    }
  });
}
else{ 
  flashColour('INVALID: Errounous Input',"#daae00",'https://i.ibb.co/88G1M9M/invalid.png');  

}
}else{
  flashColour('INVALID: Errounous Input',"#daae00",'https://i.ibb.co/88G1M9M/invalid.png');  
}
}