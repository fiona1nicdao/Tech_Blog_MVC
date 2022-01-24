console.log("javascript")
const editpostHandler = async function(event){
    event.preventDefault();
    console.log("button works")
    const title = document.querySelector('#edittitle-input').value.trim();
    const content =document.querySelector('#edit-content-input').value.trim();
    const id = document.querySelector('#post-id').value.trim();

    if(title && content){
        const response = await fetch(`/api/post/${id}`,{
            method:'PUT'
        })
    }
}

const deletepostHandler = async function(event){
    event.preventDefault();
    console.log('delete button works')
    const id = document.querySelector('#post-id').value.trim();
}

document
    .querySelector('.editpost-form')
    .addEventListener('submit',editpostHandler)


document
    .querySelector('#delete-btn')
    .addEventListener('click',deletepostHandler)