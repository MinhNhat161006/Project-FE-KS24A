let userList = JSON.parse(localStorage.getItem("userList")) || [];

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');

// Chuyển sang form Đăng ký
toRegister.addEventListener('click', event => {
  event.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

// Chuyển sang form Đăng nhập
toLogin.addEventListener('click', event => {
  event.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Hàm xử lý đăng nhập
function login(event) {
  event.preventDefault();
  const formLoginEL = event.target;
  const data = getFormData(formLoginEL);

  const userData = userList.find(user => user.email === data.email);

  if (userData.email == "" || userData.password == ""){
    return;
  }

  if (!userData) {
    const modal = new bootstrap.Modal(document.getElementById("userNotExist"));
    modal.show();
    return;
  }

  if (userData.password !== data.password) {
    const modal = new bootstrap.Modal(document.getElementById("passwordNotCorrect"));
    modal.show();
    return;
  }

  localStorage.setItem("userLogin", JSON.stringify(userData));
  const modal = new bootstrap.Modal(document.getElementById("loginSuccess"));
  modal.show();
}

// Hàm xử lý đăng ký
function register(event) {
  event.preventDefault();

  const formRegisterEL = event.target;
  const data = getFormData(formRegisterEL);


  if (!validateEmail(data.email)) {
    const modal = new bootstrap.Modal(document.getElementById("emailNotvalid"));
    modal.show();
    return;
  }

  if (!data.password || data.password.length < 8) {
    const modal = new bootstrap.Modal(document.getElementById("passwordNotValid"));
    modal.show();
    return;
  }

  if (userList.find(user => user.email === data.email)) {
    const modal = new bootstrap.Modal(document.getElementById("emailExist"));
    modal.show();
    return;
  }

  if (data.password !== data.confirmPassword) {
    const modal = new bootstrap.Modal(document.getElementById("passwordNotMatch"));
    modal.show();
    return;
  }

 

  data.role = data.email === "nhmnhat161006.nvtroi2124@gmail.com" ? "ADMIN" : "USER";

  userList.push(data);
  saveUserListToLocal(userList);

  localStorage.setItem("userLogin", JSON.stringify(data));
  const modal = new bootstrap.Modal(document.getElementById("registerSuccess"));
    modal.show();
}

function confirmAuthen () {
  window.location.href = "/";
}