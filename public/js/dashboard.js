const makepostHandler = function(event){
    event.preventDefault();
    document.location.replace('/makepost');
}
document
    .querySelector('#make-post')
    .addEventListener('click',makepostHandler);