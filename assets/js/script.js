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
  },
  sortByPrice : function (){
    //updates sorting flag which will be used to decide the order
    this.currentSortingFlag=((this.currentSortingFlag)%2)+1; //goes from 1 to 2
    console.log('this.currentSortingFlag', this.currentSortingFlag)

    if(this.currentSortingFlag === 1){
      this.flights.sort((a,b) => a.price - b.price);
    } else {
      this.flights.sort((a,b) => b.price - a.price);
    }
    
  },
  //0 unsorted, 1 descending, 2 ascending
  currentSortingFlag: 0,
  searchFlights: function (searchInput){
    searchInput = searchInput.toLowerCase();
    return this.flights.filter(flight => {
      //creates a long string with all the data for each flight then checks if this string includes any part of the search input
      const departDateObj = flight.dates[0].depart;
      const returnDateObj = flight.dates[1].return;
      const departDateString = `${departDateObj.getDate()}.${departDateObj.getMonth()}.${departDateObj.getFullYear()}`
      const returnDateString = `${returnDateObj.getDate()}.${returnDateObj.getMonth()}.${returnDateObj.getFullYear()}`
      const flightInfoString = `${flight.from.toLowerCase()} ${flight.to.toLowerCase()} \$${flight.price} ${departDateString} ${returnDateString}`;
      console.log('flightInfoString', flightInfoString)

      if( flightInfoString.includes(searchInput)){
        return true;
      }
    })
  }
}

//selecting DOM elements
const loginSection = document.querySelector("#login-section")
const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const nameInput = document.querySelector("#name");
const adminCheckbox = document.querySelector("#admin");
const availableFlightsSection = document.querySelector("#available-flights");

//selecting searchbar dom and addint event listener
const searchBar = document.querySelector("#search");
searchBar.addEventListener("input", displayAvailableFlights);

let isAdmin = false;

loginForm.addEventListener("submit", loginValidation);

//created logout button, to be appended or removed depending on wether the useris logged in or out
const logoutButton = document.createElement("button");
logoutButton.textContent = "Logout";
logoutButton.addEventListener("click", logout);

//create admin addflight menu
const addNewFlightSectionParent = document.querySelector("#add-flight-section")
const addNewFlightSection = document.querySelector("#add-flight-section section")
const addFlightForm = document.querySelector("#add-flight-section form")

addFlightForm.addEventListener("submit", addFlightFormSubmitted);

//selecting the sort by price button and adding an event listener to it
const sortByPriceBtn = document.querySelector("#sort-by-price-button");
sortByPriceBtn.addEventListener("click", sortByPriceClicked);

checkIfLoggedIn();
displayAvailableFlights();

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

  const isAdmin = localStorage.getItem("isAdmin");
  if(isAdmin === "true"){
    addNewFlightSectionParent.append(addNewFlightSection);
  }
}

function logout(){
  localStorage.clear();
  logoutButton.remove();

  loginSection.append(loginForm);

  addNewFlightSection.remove();

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
// search, and sort flights(price)

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
    displayAvailableFlights();
    addFlightForm.reset();
  }

  
}

function displayAvailableFlights(){
  // clear the section
  clearAllAvailableCardsChildren();

  const flightsArray = searchBar.value.length === 0 ? flightsDatabase.flights : flightsDatabase.searchFlights(searchBar.value);
  // const flightsArray = flightsDatabase.flights;

  flightsArray.forEach(flight => {
    const flightCard = document.createElement("section");
    flightCard.classList.add("flight-card");
    availableFlightsSection.append(flightCard);

    const countries = document.createElement("p");
    countries.innerText = `From: ${flight.from}\nTo: ${flight.to}`;
    flightCard.append(countries);
    
    const datesP = document.createElement("p");
    const departDateString = `${flight.dates[0].depart.getDate()}.${flight.dates[0].depart.getMonth()}.${flight.dates[0].depart.getFullYear()}`;
    const returnDateString = `${flight.dates[1].return.getDate()}.${flight.dates[1].return.getMonth()}.${flight.dates[1].return.getFullYear()}`;
    datesP.innerText = `${departDateString}\n${returnDateString}`
    flightCard.append(datesP);

    const priceP = document.createElement("p");
    priceP.innerText = `$${flight.price}`
    flightCard.append(priceP);

  })
}

function sortByPriceClicked(){
  flightsDatabase.sortByPrice();
  displayAvailableFlights();
}

function clearAllAvailableCardsChildren(){
  const allAvailableFlightCards = availableFlightsSection.querySelectorAll(".flight-card");

  allAvailableFlightCards.forEach((flightCard) => {
    flightCard.remove();
  })
}

//user
//search, and sort flights(price)