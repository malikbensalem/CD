
function column(row,ele,size="6"){
  col = document.createElement("div");
  $(col).addClass("col-lg-"+size);
  col.appendChild(document.createTextNode(ele));
  row.appendChild(col);
}

function editable(row,elem){
  div=document.createElement("div")
  $(div).addClass("col-lg-8");
  ele=document.createElement("input");
  $(ele).val(elem);
  div.appendChild(ele);
  row.appendChild(div);
}

function btnL(row,txt,size=0){
  rem= document.createElement("button");
  rem.appendChild(document.createTextNode(txt));
  $(rem).addClass("col-lg-"+(1+size)).addClass("col-sm-"+(5+size));
  if (txt=="Save"){
    rem.addEventListener("click", function(){
      updateLocation(row)
    })  
  }
  else{
    rem.addEventListener("click", function(){
      deleteLocation(row)
    })    
  }
  row.appendChild(rem);
}
function btnD(row,txt,size=0){
  rem= document.createElement("button");
  rem.appendChild(document.createTextNode(txt));
  $(rem).addClass("col-lg-"+(1+size)).addClass("col-sm-"+(5+size));
  if (txt=="Save"){
    rem.addEventListener("click", function(){
      updateDepartment(row)
    })  
  }
  else{
    rem.addEventListener("click", function(){
      deleteDepartment(row)
    })    
  }
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
      btnD(row,"Remove");
      btnD(row,"Save",1);
    }
    else{
      btnL(row,"Remove");
      btnL(row,"Save",1);   
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

function flashColour(e,cc="mediumvioletred"){
  //limegreen
  //#ffcc00
  e.style.borderColor = cc;
  setTimeout(() => e.style.borderColor = "lightgray", 1000);
}

function popSel(res) {
  res.forEach(element => {
    op = document.createElement("option");
    op.appendChild(document.createTextNode(element['name']));
    op.value=element['id'];
    document.getElementById("locationSele").appendChild(op);
  });
}
function deleteDepartment(e){
  $.ajax({
    url: "libs/php/deleteDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      did: e.classList[3],
    },
    success:function(result){
      if (result['status']['description']=="success"){
        flashColour(e,"limegreen");
        e.remove();
      }
      else{
        flashColour(e)
      }
    },
    error:function(a,s,d){
      flashColour(e)
    }
  });
}
function deleteLocation(e){
  $.ajax({
    url: "libs/php/deleteLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      lid: e.classList[3],
    },
    success:function(result){
      if (result['status']['description']=="Success"){
        flashColour(e,"limegreen");
        e.remove();
      }
      else{
        flashColour(e);
      }
    },
    error:function(){
      flashColour(e)
    }
  });
}
function updateDepartment(e){
  if (e.childNodes[0].childNodes[0].value&&!e.childNodes[0].childNodes[0].value.split(/[ a-zA-Z \-]/).join("")){
    $.ajax({
    url: "libs/php/updateDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      did: e.classList[3],
      dame: e.childNodes[0].childNodes[0].value,
    },
    success:function(){
      flashColour(e,"limegreen");
    },
    error:function(){
      flashColour(e)
    }
  });
  }
  else{
    flashColour(e,"#ffcc00");
  }
}

function updateLocation(e){
  if (e.childNodes[0].childNodes[0].value&&!e.childNodes[0].childNodes[0].value.split(/[ a-zA-Z \-]/).join("")){
    $.ajax({
      url: "libs/php/updateLocation.php",
      type: "POST",
      dataType: "json",
      data: {
        lid: e.classList[3],
        lame: e.childNodes[0].childNodes[0].value,
      },
      success:function(){
        flashColour(e,"limegreen");
      },
      error:function(){
        flashColour(e);
      }
    });
  }
  else{
    flashColour(e,"#ffcc00");
  }
}