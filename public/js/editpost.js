console.log("javascript")
const editpostHandler = async function(event){
    event.preventDefault();
    console.log("button works")
    const title = document.querySelector('#edittitle-input').value.trim();
    const content =document.querySelector('#edit-content-input').value.trim();
    const id = document.querySelector('#editpost-id').innerHTML;

    if(title || content){
        const response = await fetch(`/api/post/${id}`,{
            method:'PUT',
            body: JSON.stringify({title, content}),
            headers:{'Content-Type':'application/json'},
        });
        if(response.ok){
            document.location.replace('/dashboard')
        }else{
            alert('Failed to edit post')
        }
    }
}

const deletepostHandler = async function(event){
    event.preventDefault();
    console.log('delete button works')
    const id = document.querySelector('#editpost-id').innerHTML;
    if(id){
        const response = await fetch(`/api/post/${id}`,{
            method:'DELETE'
        });
        if(response.ok){
            document.location.replace('/dashboard')
        }else{
            alert('Failed to delete post')
        }
    }
    
}

document
    .querySelector('.editpost-form')
    .addEventListener('submit',editpostHandler)

document
    .querySelector('#delete-btn')
    .addEventListener('click',deletepostHandler)