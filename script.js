const request_url = 'https://jsonplaceholder.typicode.com/users';
let tbody = document.getElementById("tbody");
let deleteBtn = document.querySelector("#del_button");
let deletedUserId ;
let editUserId ;
let users = [];
const add_employee = document.forms.main;
const edit_form = document.forms.edit_form;

fetch(request_url)
    .then(res => res.json())
    .then(json => {
        users = json
        createUsers(json) 
})

function td_fun({ id, name, email, address, phone}){ 
    
    let tr = document.createElement('tr');
  
    tr.innerHTML = ` 
   
    <tr id="user_${id}">
    <td>
        <span class="custom-checkbox">
            <input type="checkbox" id="checkbox1"/>
            <label for="checkbox1"></label>
        </span>
    </td>
    <td>${name }</td>
    <td>${email}</td>
    <td>${address.street }</td>
    <td>${phone}</td>
    <td> 
      <a href="#popup_del" class=" btn btn-primary " onclick= 'deletedUserId = ${id}' >DELETED</a>
      <a href="#popup_edit" class=" btn btn-primary "   onclick="selectUser(${id})"  >EDIT</a>
      
    </td>
  
    
    </tr>
    `; 
   

        return tr;
}  

function createUsers(data){
    data.map(users => { 
        tbody.append(td_fun(users));
    })
}


function deleted_User(){ 
    let id = deletedUserId

    let index = users.findIndex((user) => {
        // console.log(user.id,id, user.id == id);
        return user.id == id ;
    })  
 
    fetch(` https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then((json) => { 
        console.log("pat ekav");
        user = users.splice(index , 1) ;
        tbody.querySelectorAll('tr')[index].remove();
    });
}


function addUser(){     
    let tr = document.createElement('tr');
   
    let new_user = {  };
      
    new_user.name = add_employee.inputName.value 
    new_user.email = add_employee.inputEmail.value 
    new_user.address = add_employee.inputAddress.value 
    new_user.phone = add_employee.inputPhone.value  
    users.push(new_user) 

    tr.innerHTML = ` 
    <tr id="user_${new_user.id}">
    <td>
        <span class="custom-checkbox">
            <input type="checkbox" id="checkbox1"/>
            <label for="checkbox1"></label>
        </span>
    </td>
    <td>${new_user.name }</td>
    <td>${new_user.email}</td>
    <td>${new_user.address.street  }</td>
    <td>${new_user.phone }</td>
    <td> 
      <a href="#popup_del" class=" btn btn-primary " onclick= 'deletedUserId = ${new_user.id}' >DELETED</a>
      <a href="#popup_edit" class=" btn btn-primary "    >EDIT</a>
      
    </td>   
    </tr>
    `; 
    tbody.append(td_fun(new_user));
}

function editUser(){
    
}

function selectUser(id){ 
    let index = users.findIndex((user) => {
        // console.log(user.id,id, user.id == id);
        return user.id == id ;
    })  
    console.log(index);
 
     edit_form.edte_name.value = users[index].name
     edit_form.edte_email.value = users[index].email
     edit_form.edte_address.value = users[index].address.street
     edit_form.edte_phone.value = users[index].phone
 
}