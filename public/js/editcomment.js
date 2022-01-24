const editpostHandler = async function(event){
    event.preventDefault();
    const content =document.querySelector('#content-input').value.trim();
    const id = document.querySelector('#editcomment-id').innerHTML;

    if(content){
        const response = await fetch(`/api/comment/${id}`,{
            method:'PUT',
            body: JSON.stringify({content}),
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
    const id = document.querySelector('#editcomment-id').innerHTML;
    if(id){
        const response = await fetch(`/api/comment/${id}`,{
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
    .querySelector('.editcomment-form')
    .addEventListener('submit',editpostHandler)

document
    .querySelector('#delete-btn')
    .addEventListener('click',deletepostHandler)