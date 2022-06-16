if (localStorage.getItem("auth_token")!=null){
    window.location.replace('/notesPanel/')
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




// To add users
loginForm=document.getElementById('login_form')
loginForm.addEventListener("submit",function(e){
    e.preventDefault()
    var url="http://127.0.0.1:8000/userAuth/api/v1/token/login"
    var email=document.getElementById('email').value
    var password=document.getElementById('password').value
    
    fetch(url, {
        method:'POST',
        mode:'cors',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body : JSON.stringify({
            "email":email,
            "password":password,
    
        }),
    }).then((resp)=> resp.json())
    .then(function (data){
        token=data.auth_token
        localStorage.setItem("auth_token", token);
        let mytoken = localStorage.getItem("auth_token");
    }).then(()=>{
        window.location.replace('/userPanel/')

    })
})
