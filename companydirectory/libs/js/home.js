function column(row,ele,temp,size="2"){
  col=document.createElement("input");
  $(col).addClass("col-lg-"+size);
  $(col).val(ele);
  col.placeholder="Enter "+temp+" here...";
  row.appendChild(col);
}
function getPersonnelByID(e){
  $.ajax({
    url: "libs/php/getPersonnelByID.php",
    type: 'POST',
    dataType: 'json',
    data:{
      pid:e.id
    },
    success: function(result) {
      e.childNodes[5].innerHTML = result['data'][0]['location'];
      e.classList=`row items ${result['data'][0]['firstName']} ${result['data'][0]['lastName']} ${result['data'][0]['email']} ${result['data'][0]['department']} ${result['data'][0]['location']} ${result['data'][0]['jobTitle']}`;
    }
  })
}

function popSel(res,iid,dir="name") {
  res.forEach(element => {
    op = document.createElement("option");
    op.appendChild(document.createTextNode(element[dir]));
    op.value=op.value.split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("")
    document.getElementById(iid).appendChild(op);
  });
}
function pops(row,res){
  sel=document.createElement("select");
  res.forEach(element=>{
    op = document.createElement("option");
    op.appendChild(document.createTextNode(element['']));
    $(sel).appendChild(op);
  })
  $(row).appendChild(sel);
}
function deps(dip){
  sel=document.createElement("select");
  for (let i = 1; i < $("#"+iid)[0].length; i++) {
    op = document.createElement("option");
    op.appendChild(document.createTextNode($("#"+iid)[0][i].text));
    $(op).val(vals)
    
    sel.appendChild(op);
  }
  $(sel).addClass("col-lg-"+size);
  row.appendChild(sel);  
  $(sel+" select").val(dip);

}
function options(row,iid,element,size,vals="") {
  sel=document.createElement("select");
  for (let i = 1; i < $("#"+iid)[0].length; i++) {
    op = document.createElement("option");
    op.appendChild(document.createTextNode($("#"+iid)[0][i].text));
    
    op.value=$("#"+iid)[0][i].value;
    sel.appendChild(op);
  }
  $(sel).addClass("col-lg-"+size);

  $(sel).val(element.split(" ").join("0"))    
  row.appendChild(sel);  
}
function btn(row,txt,size=0){
  rem= document.createElement("button");
  rem.appendChild(document.createTextNode(txt));
  $(rem).addClass("col-lg-1").addClass("col-sm-"+(5+size));
  row.appendChild(rem);  
  if (txt=="Save"){

    rem.addEventListener("click", function(){
      update(row)
    })  
  }
  else{
    rem.addEventListener("click", function(){
      dele(row)
    })
  }
}
function txt(row,ele){
  col=document.createElement("p");
  $(col).addClass("col-lg-1");
  col.appendChild(document.createTextNode(ele));
  row.appendChild(col);

}
$(window).on('load', function() {
  $.when(
  $.ajax({
    url: "libs/php/getAllSel.php",
    type: 'POST',
    dataType: 'json',
    success: function(result) {
      popSel(result['data']['person'],'firstName','firstName');
      popSel(result['data']['person'],'lastName','lastName');
      popSel(result['data']['person'],'email','email');
      popSel(result['data']['person'],'jobTitle','jobTitle');
      popSel(result['data']['location'],'location');
      
      for (let i = 0; i < result['data']['department'].length; i++) {        
        op=document.createElement("option");
        op.appendChild(document.createTextNode(result['data']['department'][i]['name']));
        $(op).val(result['data']['department'][i]['id'])
        document.getElementById("department").appendChild(op);
      }
    }
  })
  ).done(function(){
    $.ajax({
      url: "libs/php/getAll.php",
      type: 'POST',
      dataType: 'json',
      success: function(result) {
        result['data'].forEach(element => {
          row = document.createElement("div");

          $(row).addClass("row").addClass("items").addClass(element['firstName']).addClass(element['lastName'].split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("")).addClass(element['jobTitle'].split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("")).addClass(element['email'].split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("")).addClass(element['dip']).addClass(element['location'].split(" ").join(""));
          row.id=element['id'];
          txt(row,element['id']);

          column(row,element['firstName'],"First Name","1");
          column(row,element['lastName'],"Last Name","1");
          column(row,element['email'],"Email");
          column(row,element['jobTitle'],"Job","1");

          txt(row,element['location']);          
          options(row,"department",element['dip'],"2")

          btn(row,"Remove");
          btn(row,"Save",1);
          
          document.getElementById("items").appendChild(row);
        });
      }
    })
  })
})
function flashColour(e,cc="mediumvioletred"){
  //limegreen
  //#ffcc00
  e.style.borderColor = cc;
  setTimeout(() => e.style.borderColor = "lightgray", 1000);
}

function search(e){
  all="";
  all+= $('#firstName').val() ? '.'+$('#firstName').val() : '';
  all+= $('#lastName').val() ? '.'+$('#lastName').val().split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("") : '';
  all+= $('#email').val() ? '.'+$('#email').val().split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("") : '';
  all+= $('#jobTitle').val() ? '.'+$('#jobTitle').val().split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("") : '';
  all+= $('#location').val() ? '.'+$('#location').val().split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("") : '';
  all+= $('#department').val() ? '.'+$('#department').val().split(" ").join("") : '';
  if (all){
    searcher($('.items'),'none');
    searcher($(all));
    }
  else{
    searcher($('.items'));
  }
}

function searcher(classes,disType="flex") {
  for (let i = 0; i < $(classes).length; i++) {
    $(classes)[i].style.display=disType;      
  }  
}

function update(e){
  if (e.childNodes[1].value&&e.childNodes[2].value&&e.childNodes[3].value&&e.childNodes[4].value&&e.childNodes[6].value)
  {
    if (e.childNodes[3].value.match(/\S+@\S+\.\S+/)&&!e.childNodes[1].value.split(/[ a-zA-Z \-]/).join("")&&!e.childNodes[2].value.split(/[ a-zA-Z \-]/).join("")&&!e.childNodes[4].value.split(/[ a-zA-Z \-]/).join("")){
      $.ajax({
        url: "libs/php/updatePersonnel.php",
  type: 'POST',
  dataType: 'json',
  data: {
    'fame': e.childNodes[1].value,
    'lame': e.childNodes[2].value,
    'email': e.childNodes[3].value,
    'jobTitle': e.childNodes[4].value,
    'did': e.childNodes[6].value,
    'pid': e.id
  },
  success:function(result){
    getPersonnelByID(e);
    flashColour(e,"limegreen");
  },
  error:function(){
    flashColour(e);
  }
})
}
else{
  flashColour(e,"#ffcc00")

}
  }
  else{
    flashColour(e,"#ffcc00")
  }
}


function dele(e){
  $.ajax({
    url: "libs/php/deletePersonnel.php",
    type: 'POST',
    dataType: 'json',
    data :{
      pid:e.id
    },
    success:function(){
      e.remove()
    }
  })  
}