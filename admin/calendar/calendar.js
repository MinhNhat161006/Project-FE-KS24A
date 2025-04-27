

if (!localStorage.getItem("listBooking")) {
    localStorage.setItem("listBooking", JSON.stringify(listBooking));
    
  }else {
   listBooking = JSON.parse(localStorage.getItem("listBooking"));
  }

  function updateData() {
    localStorage.setItem("listBooking", JSON.stringify(listBooking));
  }



  let tabledata = document.querySelector("tbody");
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || '{}');

  function renderdataEl(data = listBooking) {
    let html = '';
    for (let i = 0; i < data.length; i++) {
      html += `
        <tr>
          <td>${data[i].className}</td>
          <td>${data[i].date}</td>
          <td>${data[i].time}</td>
          <td>${data[i].name || ''}</td>
          <td>${data[i].email || ''}</td>
          <td>
            <button class="btn btn-link p-0" onclick="openEditModal(${i})">Sửa</button>
            <button class="btn btn-link text-danger p-0" onclick="deletelistBooking(${i})">Xóa</button>
          </td>
        </tr>
      `;
    }
    tabledata.innerHTML = html;
  }
  

renderdataEl ();


// hàm thêm
const bookingForm = document.getElementById("bookingForm");
const addModal     = new bootstrap.Modal(document.getElementById("exampleModalAddList"));
const errorModal   = new bootstrap.Modal(document.getElementById("errorModal"));
const successModal = new bootstrap.Modal(document.getElementById("successModal"));
const editModalEl = document.getElementById("exampleModal2");
const editModal   = new bootstrap.Modal(editModalEl);
const successEditModal = new bootstrap.Modal(document.getElementById("editlistBooking"));

bookingForm.addEventListener("submit", function(e) {
  e.preventDefault();
  e.stopPropagation();
  bookingForm.classList.add("was-validated");

  if (!bookingForm.checkValidity()) return;

  const className = bookingForm.className.value;
  const date      = bookingForm.date.value;
  const time      = bookingForm.time.value;
  const name      = bookingForm.name.value;
  const email     = bookingForm.email.value;
  

  // Kiểm tra trùng
  const isDuplicate = listBooking.some(b => b.date === date && b.time === time);
  if (isDuplicate) {
    // show modal lỗi, đóng modal thêm
    addModal.hide();
    errorModal.show();
    bookingForm.reset();
    return;
  }

  // thêm mới
  listBooking.push({ className, date, time, name, email });
  updateData();
  renderdataEl();

  // đóng modal Thêm, mở modal Thành công
  addModal.hide();
  successModal.show();

  bookingForm.reset();
  bookingForm.classList.remove("was-validated");
});


// hàm sửa
let currentEditIndex = null;

function editlistBooking(index) {
  let className = document.querySelector("#editBookingForm select[name='className']").value;
  let date = document.querySelector("#editBookingForm input[name='date']").value;
  let time = document.querySelector("#editBookingForm select[name='time']").value;
  let name = listBooking[index].name;
  let email = listBooking[index].email;

  // Kiểm tra trùng
  const isDuplicate = listBooking.some(b => b.date === date && b.time === time);
  if (isDuplicate) {
    // show modal lỗi, đóng modal sửa
    editModal.hide();
    errorModal.show();
    return;
  }
    


  let updatedBooking = {
      className,
      date,
      time,
      name,
      email
  };

  listBooking[index] = updatedBooking;
  updateData();
  renderdataEl();

  // const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal2"));
  editModal.hide();
  // const modaledit = new bootstrap.Modal(document.getElementById("editlistBooking"));
  successEditModal.show();
}




// Đóng mở form thêm modal
function openAddModal() {
  document.getElementById("AddBookingForm").reset(); // reset form
  document.getElementById("AddBookingForm").classList.remove("was-validated"); // bỏ validate cũ

  const addModal = new bootstrap.Modal(document.getElementById('exampleModalAddList'));
  addModal.show();
}







function openEditModal(index) {
  currentEditIndex = index;
  const booking = listBooking[index];

  document.querySelector("#exampleModal2 select[name='className']").value = booking.className;
  document.querySelector("#exampleModal2 input[name='date']").value = booking.date;
  document.querySelector("#exampleModal2 select[name='time']").value = booking.time;


  editModal.show();
}


  const editForm = document.querySelector("#editBookingForm");

  editForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!editForm.checkValidity()) {
          event.stopPropagation();
          editForm.classList.add("was-validated");
          return;
      }

      editlistBooking(currentEditIndex);
  });






// Hàm xử lý xóa danh sách đặt phòng
let deleteIndex = null;

function deletelistBooking(index) {
  deleteIndex = index;
  const modal = new bootstrap.Modal(document.getElementById("deletelistBooking"));
  modal.show();
}

// Gắn sự kiện khi người dùng bấm "OK"

  const deleteConfirmBtn = document.querySelector("#deletelistBooking .btn.btn-secondary");
  
  deleteConfirmBtn.addEventListener("click", function () {
    if (deleteIndex !== null) {
      listBooking.splice(deleteIndex, 1); // xóa phần tử khỏi mảng
      updateData(); // cập nhật lại localStorage
      renderdataEl(); // render lại bảng
      deleteIndex = null; // reset lại chỉ số
    }
  });



// phân trang


// hàm lọc
function filterlistBooking() {
    const classNameSearch = document.querySelector("select[name='className']").value.toLowerCase();
    const emailSearch     = document.querySelector("input[name='email']").value.toLowerCase();
    const dateSearch      = document.querySelector("input[name='date']").value;
  
    const filteredList = listBooking.filter(d => {
      const m1 = !classNameSearch || d.className.toLowerCase().includes(classNameSearch);
      const m2 = !emailSearch     || d.email.toLowerCase().includes(emailSearch);
      const m3 = !dateSearch      || d.date === dateSearch;
      return m1 && m2 && m3;
    });
  
  
    renderdataEl(filteredList);
  }
  
  // Sau khi DOM load, chỉ gán click cho button
//   document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("filterBtn")
//       .addEventListener("click", filterlistBooking);
//   });
  

