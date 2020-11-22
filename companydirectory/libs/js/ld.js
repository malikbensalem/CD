function off(e){
  e.style.display="none";
}
function column(row,ele,size="6"){
  col = document.createElement("div");
  $(col).addClass("col-lg-"+size);
  col.appendChild(document.createTextNode(ele));
  row.appendChild(col);
}

function editable(row,elem){
  div=document.createElement("div")
  $(div).addClass("col-sm-9");
  ele=document.createElement("p");
  $(ele).html(elem);
  div.appendChild(ele);
  row.appendChild(div);
}
function on(iid,ld,cl,vid="#location"){
  $(vid).val(ld)
  document.getElementById(iid).style.display="block";
  document.getElementById(iid).classList=`overlay ${cl[3]} ${cl[2]}`;
}


function btnL(row,txt){
  rem= document.createElement("button");
  rem.appendChild(document.createTextNode(txt));
  $(rem).addClass("col-sm-2");
  rem.addEventListener("click", function(){
    on("overLocation",row.childNodes[0].childNodes[0].innerHTML,row.classList);
  })
  
  row.appendChild(rem);
}
function btnD(row,txt){
  rem= document.createElement("button");
  rem.appendChild(document.createTextNode(txt));
  $(rem).addClass("col-sm-2");
  rem.addEventListener("click", function(){
    on("overDepartment",row.childNodes[0].childNodes[0].innerHTML,row.classList,"#department");
  })
  row.appendChild(rem);
}
function loop(res,op){
  row = document.createElement("h2");
  row.appendChild(document.createTextNode(op));
  
  row.id=op;
  document.getElementById("items").appendChild(row);
  res.forEach(element => {
    row = document.createElement("div");
    $(row).addClass("row").addClass("items").addClass(op).addClass(element['id']);
    editable(row,element['name'])
    if (op=='Department'){
      btnD(row,"Edit");
    }
    else{
      btnL(row,"Edit");
    }
    document.getElementById("items").appendChild(row);
  });
}
$(window).on('load', function() {
  $.ajax({
    url: "libs/php/getLD.php",
    type: 'POST',
    dataType: 'json',
    success: function(result) {
      loop(result['data']['department'],'Department')
      loop(result['data']['location'],'Location')    
      fillLocationSele()
    }
  })
})

function fillLocationSele(){
  $.ajax({
    url: "libs/php/getLocations.php",
    type: "POST",
    dataType: "json",
  })
}

function flashColour(txt="ERROR: Somethig went wrong",cc="mediumvioletred",img="https://i.ibb.co/GHhYS5Y/error.png"){
  document.getElementById('confirmation').style.display = "block";
  document.getElementById('confirmation').style.backgroundColor = cc;
  document.getElementById('confirmationTxt').innerHTML=txt;
  document.getElementById('confirmationImg').src=img;

  setTimeout(() => document.getElementById('confirmation').style.display = "none", 5000);
}

function popSel(res) {
  res.forEach(element => {
    op = document.createElement("option");
    op.appendChild(document.createTextNode(element['name']));
    op.value=element['id'];
    document.getElementById("locationSele").appendChild(op);
  });
}
function deleteDepartment(){
  $.ajax({
    url: "libs/php/deleteDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      did: document.getElementById('overDepartment').classList[1],
    },
    success:function(result){
      if (result['status']['description']=="SUCCESS"){
        flashColour(result['status']['description'],"limegreen",'https://i.ibb.co/ZmTDCrz/success.png');
        $("."+document.getElementById('overDepartment').classList[2]+"."+document.getElementById('overDepartment').classList[1]+".items")[0].remove();
        off(document.getElementById('overDepartment'))
      }
      else{
        flashColour(result['status']['description']);
      }
    },
    error:function(){
      flashColour();
    }
  });
}
function deleteLocation(){
  $.ajax({
    url: "libs/php/deleteLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      lid: document.getElementById('overLocation').classList[1],
    },
    success:function(result){
      if (result['status']['description']=="SUCCESS"){
        flashColour(result['status']['description'],"limegreen",'https://i.ibb.co/ZmTDCrz/success.png');
        $("."+document.getElementById('overLocation').classList[2]+"."+document.getElementById('overLocation').classList[1]+".items")[0].remove();
        off(document.getElementById('overLocation'))
      }
      else{
        flashColour(result['status']['description'])
      }
    },
    error:function(){
      flashColour()
    }
  });
}

function getDepartmentByID(){
  $.ajax({
    url: "libs/php/getDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      did: document.getElementById('overDepartment').classList[1],
    },
    success :function(result) {
      $("."+document.getElementById('overDepartment').classList[2]+"."+document.getElementById('overDepartment').classList[1]+".items")[0].childNodes[0].childNodes[0].innerHTML=result['data'][0]['name'];
    }  
  })
}
function getLocationByID(){
  $.ajax({
    url: "libs/php/getLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      lid: document.getElementById('overLocation').classList[1],
    },
    success :function(result) {
      $("."+document.getElementById('overLocation').classList[2]+"."+document.getElementById('overLocation').classList[1]+".items")[0].childNodes[0].childNodes[0].innerHTML=result['data'][0]['name'];
    }  
  })
}

function updateDepartment(){
  if ($('#department').val()&&!$('#department').val().split(/[ a-zA-Z \-]/).join("")){
    $.ajax({
    url: "libs/php/updateDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      did: document.getElementById('overDepartment').classList[1],
      dame: $('#department').val(),
    },
    success:function(result){
      flashColour(result['status']['description'],"limegreen",'https://i.ibb.co/ZmTDCrz/success.png');
      getDepartmentByID()
    },
    error:function(){
      flashColour()
    }
  });
  }
  else{
    flashColour('INVALID: Errounous Input',"#daae00",'https://i.ibb.co/88G1M9M/invalid.png');
  }
}
function updateLocation(){
  if ($('#location').val()&&!$('#location').val().split(/[ a-zA-Z \-]/).join("")){
    $.ajax({
    url: "libs/php/updateLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      lid: document.getElementById('overLocation').classList[1],
      lame: $('#location').val(),
    },
    success:function(result){
      flashColour(result['status']['description'],"limegreen",'https://i.ibb.co/ZmTDCrz/success.png');
      getLocationByID();
    },
    error:function(){
      flashColour()
    }
  });
  }
  else{
    flashColour('INVALID: Errounous Input',"#daae00",'https://i.ibb.co/88G1M9M/invalid.png');
  }
}