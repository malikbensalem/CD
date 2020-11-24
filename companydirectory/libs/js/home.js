function off(e){
  e.style.display="none";
}

function on(id,first,last,email,job,department){
  document.getElementById('personnel').classList="overlay "+id;
  $('#overFirstName').val(first);
  $('#overLastName').val(last);
  $('#overEmail').val(email);
  $('#overJob').val(job);
  $('#overDepartment')[0].childNodes.forEach(element => {
    if (element.innerHTML==department) {
      $('#overDepartment').val(element.value)
    }
  });
  document.getElementById('personnel').style.display="block";
}
function column(row,ele,size="1"){
  col=document.createElement("p");
  $(col).addClass("col-lg-"+size);
  col.innerHTML=ele;
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
      e.childNodes[0].innerHTML = result['data'][0]['firstName'];
      e.childNodes[1].innerHTML = result['data'][0]['lastName'];
      e.childNodes[2].innerHTML = result['data'][0]['email'];
      e.childNodes[3].innerHTML = result['data'][0]['jobTitle'];
      e.childNodes[4].innerHTML = result['data'][0]['department'];
      e.childNodes[5].innerHTML = result['data'][0]['location'];

      e.classList=`row items ${result['data'][0]['firstName']} ${result['data'][0]['lastName']} ${result['data'][0]['email']} ${result['data'][0]['department']} ${result['data'][0]['location']} ${result['data'][0]['jobTitle']}`;
    }
  })
}

function popSel(res,iid,dir="name") {
  res.forEach(element => {
    op = document.createElement("option");
    op.appendChild(document.createTextNode(element[dir]));
    op.value=op.value.split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("").toLowerCase()
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
function btn(row,size=1){
  rem= document.createElement("button");
  x = document.createElement("IMG");
  x.setAttribute("src", "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_edit-writing-content-editing-512.png");
  x.setAttribute("width", "20");
  x.setAttribute("alt", "Edit");
  rem.appendChild(x)

  $(rem).addClass("col-lg-"+size);
  row.appendChild(rem);  
    rem.addEventListener("click", function(){
      on(row.id,row.childNodes[0].innerHTML,row.childNodes[1].innerHTML,row.childNodes[2].innerHTML,row.childNodes[3].innerHTML,row.childNodes[4].innerHTML);
    })
  
}
function txt(row,ele){
  col=document.createElement("p");
  $(col).addClass("col-lg-1");
  col.appendChild(document.createTextNode(ele));
  row.appendChild(col);

}
function popDep(res,iid){
  for (let i = 0; i < res.length; i++) {        
        op=document.createElement("option");
        op.appendChild(document.createTextNode(res[i]['name']));
        $(op).val(res[i]['id'])
        document.getElementById(iid).appendChild(op);
      }
      

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
      popDep(result['data']['department'],"department")
      popDep(result['data']['department'],"overDepartment")

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

          $(row).addClass("row").addClass("items").addClass(element['firstName'].toLowerCase()).addClass(element['lastName'].split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("").toLowerCase()).addClass(element['jobTitle'].split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("").toLowerCase()).addClass(element['email'].split(/[ !?@#\$%\^\&*\)\(+=._-]/).join("").toLowerCase()).addClass(element['dip']).addClass(element['location'].split(" ").join("").toLowerCase());
          row.id=element['id'];
         
          column(row,element['firstName']);
          column(row,element['lastName']);
          column(row,element['email'],"3");
          column(row,element['jobTitle']);
          column(row,element['department'],"2");
          column(row,element['location'],"2");

          btn(row);
          
          document.getElementById("items").appendChild(row);
        });
      }
    })
  })
})

function flashColour(txt="ERROR: Something went wrong",cc="mediumvioletred",img="https://i.ibb.co/GHhYS5Y/error.png"){
  document.getElementById('confirmation').style.display = "block";
  document.getElementById('confirmation').style.backgroundColor = cc;
  document.getElementById('confirmationTxt').innerHTML=txt;
  document.getElementById('confirmationImg').src=img;

  setTimeout(() => document.getElementById('confirmation').style.display = "none", 5000);
}

function search(e){
  all=$('#search').val() ? '.'+$('#search').val().split(/[!?@#\$%\^\&*\)\(+=._-]/).join("").split(" ").join(".").toLowerCase() :"";
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

function update(e,first,last,email,job,department){
  if (first&&last&&email&&job&&department)
  {
    if (email.match(/\S+@\S+\.\S+/)&&!first.split(/[ a-zA-Z \-]/).join("")&&!last.split(/[ a-zA-Z \-]/).join("")&&!job.split(/[ a-zA-Z \-]/).join("")){
      $.ajax({
        url: "libs/php/updatePersonnel.php",
  type: 'POST',
  dataType: 'json',
  data: {
    'fame': first,
    'lame': last,
    'jobTitle': job,
    'email': email,
    'did': department,
    'pid': e.id
  },
  success:function(result){
    getPersonnelByID(e);
    flashColour(result['status']['description'],"limegreen",'https://i.ibb.co/ZmTDCrz/success.png');
  },
  error:function(){
    flashColour();
  }
})
}
else{
  flashColour('INVALID: Errounous Input',"#daae00",'https://i.ibb.co/88G1M9M/invalid.png')

}
  }
  else{
  flashColour('INVALID: Errounous Input',"#daae00",'https://i.ibb.co/88G1M9M/invalid.png')
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
      off(document.getElementById('personnel'))
    }
  })  
}