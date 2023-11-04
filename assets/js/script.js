const flightsDatabase = {
  flights : [
    {
        from: "Tel aviv",
        to:'amsterdam',
        price: 40,
        dates:[
            {depart: new Date ('2023/11/24')},
            {return: new Date ('2023/12/1')}
        ]
    },
    {
        from: "Tel aviv",
        to:'london',
        price: 75,
        dates:[
            {depart: new Date ('2023/11/28')},
            {return: new Date ('2023/12/12')}
        ]
    },
    {
        from: "Athens",
        to:'Prague',
        price: 95,
        dates:[
            {depart: new Date ('2023/11/28')},
            {return: new Date ('2023/12/12')}
        ]
    },
    {
        from: "Berlin",
        to:'Prague',
        price: 22,
        dates:[
            {depart: new Date ('2023/11/28')},
            {return: new Date ('2023/12/12')}
        ]
    },
    {
        from: "London",
        to:'Berlin',
        price: 100,
        dates:[
            {depart: new Date ('2023/11/28')},
            {return: new Date ('2023/12/12')}
        ]
    }
  ],
  addFlight : function (from, to, price, departureDate, returnDate){
    console.log("DEPART", departureDate);
    console.log("DEPART", new Date (departureDate));
    const newFlight = {
      from: from,
      to: to,
      price: price,
      dates: [
        {depart: new Date (departureDate)},
        {return: new Date (returnDate)}
    ],
    };

    this.flights.push(newFlight);
    console.log(this.flights);
  },
}

//selecting DOM elements
const loginSection = document.querySelector("#login-section")
const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const nameInput = document.querySelector("#name");
const adminCheckbox = document.querySelector("#admin");
const availableFlightsSection = document.querySelector("#available-flights");

let isAdmin = false;

loginForm.addEventListener("submit", loginValidation);

//created logout button, to be appended or removed depending on wether the useris logged in or out
const logoutButton = document.createElement("button");
logoutButton.textContent = "Logout";
logoutButton.addEventListener("click", logout);

//create admin addflight menu
const addNewFlightSection = document.querySelector("#add-flight-section")
const addFlightForm = document.querySelector("#add-flight-section form")

addFlightForm.addEventListener("submit", addFlightFormSubmitted);


checkIfLoggedIn();

//USER AUTHENTICATION

function loginValidation(event){
  event.preventDefault();

  let isValid = true;

  //validate email
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!emailRegex.test(emailInput.value)){
    isValid = false;
    showError(emailInput, "Please enter a valid email.");
  } else {
    showError(emailInput, "");
  }

  //validate password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if(passwordRegex.test(passwordInput.value) || passwordInput.value.length === 0){
    isValid = false;
    showError(passwordInput, "Please enter a valid password.")
  }else{
    showError(passwordInput, "")
  }


  if(isValid){
    console.log("valid");
    isAdmin = adminCheckbox.checked;
    let email = emailInput.value;
    let name = nameInput.value;
    let password = passwordInput.value;


    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    localStorage.setItem("password", password);
    localStorage.setItem("isAdmin", isAdmin);

    login();
    
  }
}

function showError(input, message){
  const errorP = document.querySelector(`#${input.id}Error`);
  errorP.textContent = message;
}

function login(){
  loginForm.remove();

  loginSection.append(logoutButton);
}

function logout(){
  localStorage.clear();
  logoutButton.remove();

  loginSection.append(loginForm);

}

function checkIfLoggedIn(){
  console.log(localStorage);
  if(localStorage.length > 0){
    login();
  } else {
    logout();
  }
}


//User Roles and Features

//if admin
//add flights, search, and sort flights(price)

//gets the inputs from the form and calls the function that adds the input to the database
function addFlightFormSubmitted(event){
  event.preventDefault();

  if(from && to  && price && departDate && returnDate){
    const from = addFlightForm.elements.from.value;
    const to = addFlightForm.elements.to.value;
    const price = Number(addFlightForm.elements.price.value);
    const departDate = new Date(addFlightForm.elements.departDate.value);
    const returnDate = new Date(addFlightForm.elements.returnDate.value);

    flightsDatabase.addFlight(from, to, price, departDate, returnDate);
  }

  console.log(flightsDatabase.flights);
  
}

//user
//search, and sort flights(price)