let email= document.getElementById("email");
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
const button = document.getElementById("submit");
let error = false;

button.addEventListener("click", function() {
  email= document.getElementById("email");
  // Email validation.
  if(emailRegex.test(email.value)) {
    document.getElementById("email").classList.remove("email-error");
    // Send email parameter. 
    window.location=`response.html?mail=${email.value}`;
  } else {
    document.getElementById("email").classList.add("email-error");
    errorInput()
  }
});

// Create error input message.
function errorInput() {
  if (!error) {
    let span = document.createElement('span');
    span.className = "red-background";
    span.innerHTML = 'Please add a valid email address';
    document.getElementById("input-container").append(span);
    error = true;
  } 
}
