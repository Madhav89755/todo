var baseNotesUrl="http://127.0.0.1:8000/notesOperate/getNotes"


let token = 'Token '+localStorage.getItem("auth_token");
if (localStorage.getItem("auth_token")==null){
    window.location.replace('/')
}

// ==============================CSRF TOKEN====================================

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

var activeNote=null

// To get Notes
createList()
function createList(){
    var wrapper=document.getElementById('table_data')
    wrapper.innerHTML=""
    
    // url
    var url=baseNotesUrl
    
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
                    <td>${list[i].note}</td>
                    <td>${list[i].status}</td>
                    <td>
                    <button type="button" class="btn btn-sm btm-outline-info btn-info edit">Edit</button>
                    <button type="button" class="btn btn-sm btm-outline-dark btn-dark delete">Delete</button>
                    </td>
                </tr>
            `    
            wrapper.innerHTML+=item

        }
        for (var i in list){
            var editBtn=document.getElementsByClassName('edit')[i]
            editBtn.addEventListener('click', (function (item) {
                return function () {
                    editNotes(item)
                }
            })(list[i]))

            var deleteBtn=document.getElementsByClassName('delete')[i]
            deleteBtn.addEventListener('click', (function (item) {
                return function () {
                    deleteNotes(item)
                }
            })(list[i]))
        }

    })

}

// To add Notes
formNote=document.getElementById('formNote')
formNote.addEventListener("submit",function(e){
    e.preventDefault()
    
    // url
    var url=baseNotesUrl
    
    if (activeNote!=null){

        // url
        var url=baseNotesUrl+`/${activeNote.id}`
    }
    var note=document.getElementById('note').value
    var status=document.getElementById('status').value

    if (activeNote!=null){
        methodType=activeNote.methodType
        bodyData=JSON.stringify({"note":note,"status":status})

    }else{
        methodType='POST'
        bodyData=JSON.stringify({"note":note,"status":status,"user":5})
    }


    fetch(url, {
        method:methodType,

        mode:'cors',
        headers:{
            'Content-type':'application/json',
            'Authorization' : token,
            'X-CSRFToken': csrftoken,
        },
        body : bodyData,
    }).then(function(){
        createList()
        document.getElementById('formNote').reset()

    })
})

// To update notes
function editNotes(note){
    activeNote=note
    document.getElementById('id').value=activeNote.id
    document.getElementById('note').value=activeNote.note
    document.getElementById('status').value=activeNote.status
    activeNote.methodType='PUT'
}


// To delete notes
function deleteNotes(note){
    
    // url
    var url=baseNotesUrl+`/${note.id}`

    fetch(url, {
        method:'DELETE',
        mode:'cors',
        headers:{
            'Content-type':'application/json',
            'Authorization' : token,
            'X-CSRFToken': csrftoken,
        }
    }).then((response)=>{
        createList()
    })

}
