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

  var listService = [
    {
      className: "Gym",
      date: "Tập luyện với các thiết bị hiện đại",
      time: "https://ansupps.com/cdn/shop/articles/weights.jpg?v=1692780831"
    },
    {
      className: "Yoga",
      date: "Thư giãn và cân bằng tâm trí",
      time: "https://img.freepik.com/premium-vector/international-yoga-day-banner-design-vector-file_783553-340.jpg"
    },
    {
      className: "Zumba",
      date: "Đốt cháy calories với những điệu nhảy sôi động",
      time: "https://img.freepik.com/free-psd/zumba-lifestyle-banner-template_23-2149193901.jpg"
    }
  ];

  if (!localStorage.getItem("listService")) {
    localStorage.setItem("listService", JSON.stringify(listService));
    
  }else {
   listService = JSON.parse(localStorage.getItem("listService"));
  }

  function updateData() {
    localStorage.setItem("listService", JSON.stringify(listService));
  }


let tabledata = document.querySelector("tbody");
function renderdataEl (data = listService) {
    let html = '';
    for (let i=0; i<data.length; i++) {
        html += `
            <tr>
                <td>${data[i].className}</td>
                <td>${data[i].date}</td>
              <td><img src="${data[i].time}" style="width: 100px; height: auto;" alt="Service Image"></td>

                <td>
          <button style="background: none; border: none; color: blue;"
                  onclick="openEditModal(${i})">Sửa</button>
          <button style="background: none; border: none; color: red;"
                  onclick="deletelistBooking(${i})">Xóa</button>
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
const editModalEl = document.getElementById("exampleModal2");
const editModal   = new bootstrap.Modal(editModalEl);


bookingForm.addEventListener("submit", function(e) {
  e.preventDefault();
  e.stopPropagation();
  bookingForm.classList.add("was-validated");

  if (!bookingForm.checkValidity()) return;

  const className = bookingForm.elements['className'].value;
const date      = bookingForm.elements['date'].value;
const time      = bookingForm.elements['time'].value;


  // thêm mới
  listService.push({ className, date, time,});
  updateData();
  renderdataEl();

  // đóng modal Thêm, mở modal Thành công
  addModal.hide();

  bookingForm.reset();
  bookingForm.classList.remove("was-validated");
});



// hàm sửa
let currentEditIndex = null;

function editlistBooking(index) {
  let className = document.querySelector("#editBookingForm input[name='className']").value;
  let date = document.querySelector("#editBookingForm textarea[name='date']").value;
  let time = document.querySelector("#editBookingForm input[name='time']").value;

  let updatedBooking = {
      className,
      date,
      time
  };

  listService[index] = updatedBooking;
  updateData();
  renderdataEl();


  editModal.hide();

}











function openEditModal(index) {
  currentEditIndex = index;
  const booking = listService[index];

  document.querySelector("#exampleModal2 input[name='className']").value = booking.className;
  document.querySelector("#exampleModal2 textarea[name='date']").value = booking.date;
  document.querySelector("#exampleModal2 input[name='time']").value = booking.time;


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
      listService.splice(deleteIndex, 1); // xóa phần tử khỏi mảng
      updateData(); // cập nhật lại localStorage
      renderdataEl(); // render lại bảng
      deleteIndex = null; // reset lại chỉ số
    }
  });



// // phân trang






