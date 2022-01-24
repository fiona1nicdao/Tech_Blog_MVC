console.log("javascript")
const makepostHandler = async function(event){
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const user_id = document.querySelector('#makepost-userid').innerHTML;

    if(content && title && user_id){
        const response = await fetch('/api/post/',{
            method:'POST',
            body: JSON.stringify({content, title, user_id}),
            headers:{
                'Content-Type':'application/json',
            },
        });
        if(response.ok){
            document.location.replace('/dashboard')
        }else{
            alert('Failed to create post')
        }
    }
}
document
    .querySelector('.new-post-form')
    .addEventListener('submit', makepostHandler)