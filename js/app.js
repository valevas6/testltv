const email = document.getElementById("email");
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
const button = document.getElementById("submit");

button.addEventListener("click", function() {

    if(emailRegex.test(email.value)) {
        console.log('correct');
        document.getElementById("email").classList.remove("email-error");
    } else {
        console.log('error');
        document.getElementById("email").classList.add("email-error");
    }

    fetch(`https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${email.value}`)
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }
            response.json().then(function(data) {
                console.log(data);
                if(data.length === 0) {
                    console.log('SIN DATOS');
                }
               
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
        console.log('ERROR');
    });
});

