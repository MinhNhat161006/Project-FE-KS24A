let userLogin = null

function checkAuthen() {
    userLogin = JSON.parse(localStorage.getItem("userLogin"))
}


function renderHeader () {
    let userBoxEl = document.querySelector(".user_box")


    if (userLogin){
        userBoxEl.innerHTML=`
          <a href = "/">Trang chủ</a>
          <a href = "booking">Lịch đã đặt</a>
          <span>Hello ${userLogin.name}!
          <button onclick ="logout()">Đăng xuất</button>
          </span>
                 ${
                    userLogin.role == "ADMIN" ? `<a href="../../admin/calendar/index.html">Quản lý Admin</a>` : ""
                  }
             

          
        `
    } else {
        userBoxEl.innerHTML=`
          <a href = "/">Trang chủ</a>
          <a href = "/">Lịch tập</a>
          <a href = "authen">Đăng nhập / Đăng ký</a>
        `
    }
}

// let gym =0;
// let yoga =0;
// let zumba= 0;
// for (let i = 0; i<listBooking.length; i++) {
//   if(lisBooking[i].className === "Gym"){
//     gym++;
//   } else if (isBooking[i].className === "Yoga") {
//     yoga++;
//   } else {
//     zumba++;
//   }
// }
// function renderStats () {
//   let statsGym = document.querySelector("#gym")
//   statsBoxEl.innerHTML=`
//   <p class="text-primary">${gym}</p>
//   `

//   let statsYoga = document.querySelector("#yoga")
//   statsBoxEl.innerHTML=`
//   <p class="text-primary">${yoga}</p>
//   `

//   let statsZumba = document.querySelector("#zumba")
//   statsBoxEl.innerHTML=`
//   <p class="text-primary">${zumba}</p>
//   `
// }




function logout () {
  const logoutModal    = new bootstrap.Modal(document.getElementById("logoutModal"));
  logoutModal.show()

}

function confirmLogout() {
  localStorage.removeItem("userLogin");
  window.location.href = "/authen";
}

checkAuthen()
renderHeader()
renderStats()