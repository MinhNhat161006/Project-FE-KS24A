let userLogin = null

function checkAuthen() {
    userLogin = JSON.parse(localStorage.getItem("userLogin"))
}


function renderHeader () {
    let userBoxEl = document.querySelector(".user_box")


    if (userLogin){
        userBoxEl.innerHTML=`
        
             ${
                    userLogin.role == "ADMIN" ? `<a href = "/admin">Quản lý Admin</a>` : ""
                  }
          <a href = "/">Trang chủ</a>
          <a href = "booking">Lịch đã đặt</a>
          <span>Hello ${userLogin.name}!
          <button onclick ="logout()">Đăng xuất</button>
          </span>
             

          
        `
    } else {
        userBoxEl.innerHTML=`
          <a href = "/">Trang chủ</a>
          <a href = "booking">Lịch tập</a>
          <a href = "authen">Đăng nhập / Đăng ký</a>
        `
    }
}




function logout () {
    if (!confirm("Bạn có chắc muốn đăng xuất?")) false
        {
        window.location.href="/"
        window.localStorage.removeItem("userLogin")
    }
}

checkAuthen()
renderHeader()