const loginFormHandler = async function(event) {
    event.preventDefault();
    const name = document.querySelector('#name-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();
    
    if ( name && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ name, password}),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      }
}
document
    .querySelector('.login-form')
    .addEventListener('submit',loginFormHandler);