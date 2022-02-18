const commentHandler = async function(event){
    event.preventDefault();
    const content = document.querySelector('#comment-input').value.trim();
    const user_id = document.querySelector('#commentAuthor').innerHTML;
    const post_id = document.querySelector('#post-id').innerHTML;

    console.log(content, user_id, post_id)

    if (content && post_id && commentAuthor){
        console.log("correct")
        const response = await fetch('/api/comment/',{
            method:'POST',
            body:JSON.stringify({content, post_id, user_id}),
            headers:{
                'Content-Type':'application/json',
            }, 
        });
        if(response.ok){
            document.location.replace(`/post/${post_id}`) 
            console.log("hello",response)
        }else{
            alert('Failed to create comment');
        }
    }
}
document
    .querySelector(".comment-form")
    .addEventListener('submit',commentHandler)