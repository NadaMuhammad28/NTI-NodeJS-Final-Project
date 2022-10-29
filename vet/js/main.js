var myForm = document.getElementById("myForm");

function nameValidation(element) {
  var inputValue = element.value.trim();
  if (inputValue.length < 3) showError(element, "at least 3 character");
  else removeError(element);
}
function emailValidation(element) {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  console.log(emailPattern.test(element.value));
  if (emailPattern.test(element.value) == false)
    showError(element, "invalid email");
  else removeError(element);
}

function showError(ele, msg) {
  ele.nextElementSibling.innerText = msg;
}
function removeError(ele) {
  ele.nextElementSibling.innerText = "";
}

myForm.addEventListener("input", function (e) {
  if (e.target.id == "userName") {
    nameValidation(e.target);
  } else if (e.target.id == "userEmail") {
    emailValidation(e.target);
  }
});

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  engine(userName, 0, "Please Enter Your Name");
  engine(email, 1, "Please Enter Your Email");
  engine(subject, 2, "Please Enter The Subject");
  engine(subject, 3, "Please Enter Your Message");
});
