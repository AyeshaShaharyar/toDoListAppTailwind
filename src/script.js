// In-memory user database
const users = [
  { username: "user", password: "123xyz" },
  { username: "user1", password: "123abc" },
];

//login
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");
  //check if user exists in db
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    //login
    window.location.href = "dashboard.html";
  } else {
    //show error message
    message.innerText = "Invalid username or password.";
  }
}


//to-do list and tile/list view
