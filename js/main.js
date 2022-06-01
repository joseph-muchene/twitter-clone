const credentials = document.getElementById("credential");
const closeBtn = document.getElementById("closeBtn");
const signUp = document.getElementById("signUp");

console.log(signUp);
signUp.onclick = function () {
  console.log("hello ");
  credentials.style.visibility = "visible";
};

closeBtn.onclick = function () {
  credentials.style.visibility = "hidden";
};
// register
const registerBtn = document.getElementById("registerbtn");

registerBtn.onclick = () => {
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // send user to the database

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      let user = userCredentials.user;
      if (user) {
        // redirect the user to the home page

        window.location.href = "../views/home.html";
      }
    });
};




// users
