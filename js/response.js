let email= document.getElementById("email");
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
const button = document.getElementById("submit");

const url = window.location.href;
document.getElementById("response").innerText = "Please wait a moment...";

const query = window.location.search.substring(1);

const vars = query.split("&");
for (let i=0; i < vars.length; i++) {
  var pair = vars[i].split("=");
}

info(pair[1]);

button.addEventListener("click", function() {
  email= document.getElementById("email");

  if(emailRegex.test(email.value)) {
    console.log('correct');
    document.getElementById("email").classList.remove("email-error");
  } else {
    console.log('error');
    document.getElementById("email").classList.add("email-error");
  }
  info(email.value);
  window.location=`response.html?mail=${email.value}`;
});

console.log(email.value);

function info (value) {
  fetch(`https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${value}`)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
          response.status);
          return;
        }
        response.json().then(function(data) {
          document.getElementById("spinner").classList.remove("hidden"); 
            document.getElementById("spinner").classList.add("visible");
          if(data.length === 0) {
            setTimeout(function() {
                document.getElementById("response").innerText = "0 Results";
                document.getElementById("description").innerText = "Try starting a new search below";
                document.getElementById("spinner").classList.add("hidden"); 
            }, 2000);

          } else {
            setTimeout(function() {
                document.getElementById("spinner").classList.add("hidden"); 
                document.getElementById("response").innerText = "1 Results"
                document.getElementById("description").innerText = "Look at the result below to see the details of the person you’re searched for.";
                addInfoBox(data);
            }, 2000);
          }
        });
      }
    )
    .catch(function(err) {
        document.getElementById("response").innerText = "0 Results"
        document.getElementById("description").innerText = "Try starting a new search below"
    });
}

function addInfoBox(data) {
  let div = document.createElement('div');
  div.className = "wrapper";
  div.innerHTML = '<div class="align-box info-container"><div class="flex-wrapper"><div class="flex-content-icon"><img src="assets/icn_person-blue.svg" alt="Company logo"></div><div class="flex-content-info"><h2 class="text-blue text-bold">'+data.first_name + " " + data.last_name+'</h2><p class="margin-botton">'+data.description+'</p><div class="flex-wrapper"><div class="flex-content-50 margin-right"><h3 class="text-blue font-22 text-bold">Address</h3><p class="margin-botton">'+data.address+'</p></div><div class="flex-content-50"><h3 class="text-blue font-22 text-bold">Phone numbers</h3><div class="margin-botton" id="resPhone"></div></div></div><div class="flex-wrapper"><div class="flex-content-50  margin-right"><h3 class="text-blue font-22 text-bold">Email</h3><p class="margin-botton">'+data.email+'</p></div><div class="flex-content-50"><h3 class="text-blue font-22 text-bold">Relatives</h3><div class="margin-botton"id="resRelatives"></div></div></div></div></div></div></div>';
  document.getElementById("main-container").appendChild(div);

  data.phone_numbers.forEach( function(value) {
    let item = document.createElement("p");
    item.innerHTML = value;
    document.getElementById("resPhone").appendChild(item);
  });

  data.relatives.forEach( function(value) {
    let item = document.createElement("p");
    item.innerHTML = value;
    document.getElementById("resRelatives").appendChild(item);
  });
}
