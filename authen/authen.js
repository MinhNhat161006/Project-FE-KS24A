//  Fake data mặc định
const defaultUsers = [
  { name: "MinhNhat",  email: "nguyenthimailoanvta@gmail.com",   password: "12345678", role: "USER" },
  { name: "Minh Nhật", email: "nhmnhat161006.nvtroi2124@gmail.com", password: "12345678", role: "ADMIN" },
  { name: "Nhật Quỳnh",email: "nhatquynh@gmail.com",              password: "12345678", role: "USER" },
  { name: "Tấn Hão",  email: "tanhao@gmail.com",                 password: "12345678", role: "USER" },
  { name: "adsf",     email: "dscsdc@gmail.com",                 password: "12345678", role: "USER" },
  { name: "ưdadwa",   email: "nma@gmail.com",                    password: "12345678", role: "USER" },
  { name: "sdadsaf",  email: "a@gmail.com",                      password: "12345678", role: "USER" },
  { name: "à",        email: "b@gmail.com",                      password: "12345678", role: "USER" },
  { name: "b",        email: "c@gmail.com",                      password: "12345678", role: "USER" },
  { name: "Lê Cường", email: "cuong@gmail.com",                  password: "12345678", role: "USER" },
];

//  Load hoặc seed userList
let userList;
if (!localStorage.getItem("userList")) {
  userList = defaultUsers.slice();               // copy fake data
  localStorage.setItem("userList", JSON.stringify(userList));
} else {
  userList = JSON.parse(localStorage.getItem("userList"));
}


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