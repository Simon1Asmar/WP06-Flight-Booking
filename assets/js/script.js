const flights = [
  {
      from: "Tel aviv",
      to:'amsterdam',
      price: 40,
      dates:[
          {depart: new Date ('24.11.2023')},
          {return: new Date ('1.12.2023')}
      ]
  },
  {
      from: "Tel aviv",
      to:'london',
      price: 75,
      dates:[
          {depart: new Date ('28.11.2023')},
          {return: new Date ('12.12.2023')}
      ]
  },
  {
      from: "Athens",
      to:'Prague',
      price: 95,
      dates:[
          {depart: new Date ('28.11.2023')},
          {return: new Date ('12.12.2023')}
      ]
  },
  {
      from: "Berlin",
      to:'Prague',
      price: 22,
      dates:[
          {depart: new Date ('28.11.2023')},
          {return: new Date ('12.12.2023')}
      ]
  },
  {
      from: "London",
      to:'Berlin',
      price: 100,
      dates:[
          {depart: new Date ('28.11.2023')},
          {return: new Date ('12.12.2023')}
      ]
  }
]

//selecting DOM elements
const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const nameInput = document.querySelector("#name");
const adminCheckbox = document.querySelector("#admin");

let isAdmin = false;

loginForm.addEventListener("submit", loginValidation);

//created logout button, to be appended or removed depending on wether the useris logged in or out
const logoutButton = document.createElement("button");
logoutButton.textContent = "Logout";
logoutButton.addEventListener("click", logout);

checkIfLoggedIn();

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

  document.body.append(logoutButton);
}

function logout(){
  localStorage.clear();
  logoutButton.remove();

  document.body.append(loginForm);

}

function checkIfLoggedIn(){
  console.log(localStorage);
  if(localStorage.length > 0){
    login();
  } else {
    logout();
  }
}