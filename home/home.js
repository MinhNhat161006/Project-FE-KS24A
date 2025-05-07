let userLogin = JSON.parse(localStorage.getItem("userLogin"));


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





function logout () {
  const logoutModal    = new bootstrap.Modal(document.getElementById("logoutModal"));
  logoutModal.show()

}

function confirmLogout() {
  localStorage.removeItem("userLogin");
  window.location.href = "/authen";
}

renderHeader()
