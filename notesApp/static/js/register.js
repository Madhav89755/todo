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

formregisterForm=document.getElementById('register_form')
formregisterForm.addEventListener('submit',function(e){
    e.preventDefault()
    var url="http://127.0.0.1:8000/userAuth/api/v1/users/"
    var email=document.getElementById('email').value
    var username=document.getElementById('username').value
    var password=document.getElementById('password').value
    
    bodyData=JSON.stringify({
        "email":email,
        "username":username,
        "password":password
    })

    fetch(url,{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:bodyData
    }).then(()=>{
        window.location.replace('/')
    })

})