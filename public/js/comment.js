const commentHandler =function(event){
    event.preventDefault();
    alert("button works")
    const content = document.querySelector('#comment-input').value.trim();
    const user_id = document.querySelector('#user-id').innerHTML;
    const post_id = document.querySelector('#post-id').innerHTML;
    if (content && user_id && post_id){
        const response = await fetch('/api/comment/',{
            method:'POST',
            body:JSON.stringify({content, user_id, post_id}),
            headers:{
                'Content-Type':'application/json',
            },
        });
        if(response.ok){
            document.location.replace(`/post/${post_id}`)
        }else{
            alert('Failed to create comment');
        }
    }
}
document
    .querySelector(".comment-form")
    .addEventListener('submit',commentHandler)