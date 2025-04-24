function getFormData(formEL) {
    /*
    - Nhận vào 1 form element sau đó trả về các trường dữ liệu của các ô input có name
    */

    /* Tạo ra 1 object có tên biến là data và chưa có trường nào */
    let data = {}

    for(element of formEL.elements) {
        if(element.name != "") {
            data[element.name] = element.value
        }
    }

    return data;
}


/* Lib validate */
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


/* local */
function saveUserListToLocal(userList) {
    localStorage.setItem("userList", JSON.stringify(userList))
}


/* authen account */
function getUserLoginData() {
    let userData = JSON.parse(localStorage.getItem("userLogin"))
    return userData
}

