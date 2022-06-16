var baseUrl='http://127.0.0.1:8000/userAuth/'



let token = 'Token '+localStorage.getItem("auth_token");
if (localStorage.getItem("auth_token")==null){
    window.location.replace('/')
}
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');



var activeUser=null




// To get users
createUserList()
function createUserList(){
    var wrapper=document.getElementById('user_data')
    wrapper.innerHTML=""

    // url
    var url=baseUrl+"getUsers"
    fetch(url,{
        method: 'GET',
        mode: 'cors',
        headers:{
            'Authorization' : token
        }
    })
    .then((resp)=> resp.json())
    .then(function(data){
        var list=data
        for (var i in list){
            var x=parseInt(i)+parseInt(1)
            var item = `
                <tr id="row${i}">
                    <td>${x}</td>
                    <td>${list[i].email}</td>
                    <td>${list[i].username}</td>
                    <td>${list[i].first_name} ${list[i].last_name}</td>
                    <td>${list[i].phonenumber}</td>
                    <td>${list[i].age}</td>
                    <td>${list[i].office_name}</td>
                    <td>${list[i].designation}</td>
                    <td>
                    <button type="button" class="btn btn-sm btm-outline-info btn-info editUsr">Edit</button>
                    <button type="button" class="btn btn-sm btm-outline-dark btn-dark deleteUsr">Delete</button>
                    </td>
                </tr>
            `    
            wrapper.innerHTML+=item

        }
        for (var i in list){
            var editUsrBtn=document.getElementsByClassName('editUsr')[i]
            editUsrBtn.addEventListener('click', (function (item) {
                return function () {
                    editUsers(item)
                }
            })(list[i]))

            var deleteUsrBtn=document.getElementsByClassName('deleteUsr')[i]
            deleteUsrBtn.addEventListener('click', (function (item) {
                return function () {
                    deleteUsers(item)
                }
            })(list[i]))
        }

    })

}

// To add users
formregisterForm=document.getElementById('userRegisterForm')
formregisterForm.addEventListener("submit",function(e){
    e.preventDefault()
    var id=document.getElementById('id').value
    var email=document.getElementById('email').value
    var username=document.getElementById('username').value
    var password=document.getElementById('password').value
    var first_name=document.getElementById('first_name').value
    var last_name=document.getElementById('last_name').value
    var phonenumber=document.getElementById('phonenumber').value
    var age=document.getElementById('age').value
    var office_name=document.getElementById('office_name').value
    var designation=document.getElementById('designation').value

    if (activeUser==null){
        
        // url
        var url=baseUrl+"api/v1/users/"
        bodyData=JSON.stringify({
            "email":email,
            "username":username,
            "password":password,
        })
        console.log(bodyData)
    
        fetch(url, {
            method:'POST',
            mode:'cors',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body : bodyData,
        }).then(function(){
            createUserList()
            document.getElementById('userRegisterForm').reset()
        })
    }

    if (activeUser!=null){
        
        // url
        var url=baseUrl+`getUsers/${activeUser.id}`

            bodyData=JSON.stringify({
                "email":email,
                "username":username,
                "first_name":first_name,
                "last_name":last_name,
                "phonenumber":phonenumber,
                "age":age,
                "office_name":office_name,
                "designation":designation
            })

        
        fetch(url, {
            method:'PUT',
            mode:'cors',
            headers:{
                'Content-type':'application/json',
                'Authorization' : token,
                'X-CSRFToken': csrftoken,
            },
            body : bodyData,
        }).then(function(response){
            document.getElementById('message').value=response
            createUserList()
            document.getElementById('userRegisterForm').reset()
            // document.getElementById('password').disabled=false

        })
    }

})

// To update user
function editUsers(user){
    activeUser=user
    document.getElementById('id').value=activeUser.id
    document.getElementById('email').value=activeUser.email
    document.getElementById('username').value=activeUser.username
    // document.getElementById('password').disabled=true
    document.getElementById('password').value=activeUser.password
    document.getElementById('first_name').value=activeUser.first_name
    document.getElementById('last_name').value=activeUser.last_name
    document.getElementById('phonenumber').value=activeUser.phonenumber
    document.getElementById('age').value=activeUser.age
    document.getElementById('office_name').value=activeUser.office_name
    document.getElementById('designation').value=activeUser.designation

}


// To delete user
function deleteUsers(user){

    // url    
    var url=baseUrl+`getUsers/${user.id}`
    fetch(url, {
        method:'DELETE',
        mode:'cors',
        headers:{
            'Content-type':'application/json',
            'Authorization' : token,
            'X-CSRFToken': csrftoken,
        }
    }).then((response)=>{
        createUserList()
    })

}

