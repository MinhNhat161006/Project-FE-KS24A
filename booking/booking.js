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

  let listBooking = [
    {
        className : "Gym",
        date : "2023-10-01",
        time : "07:00 - 09:00"
        
    }
  ]

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

  function renderdataEl (){
    let html = '';
    for (let i=0; i<listBooking.length; i++) {
        html += `
            <tr>
                <td>${listBooking[i].className}</td>
                <td>${listBooking[i].date}</td>
                <td>${listBooking[i].time}</td>
                <td>${listBooking[i].name || ''}</td>
                <td>${listBooking[i].email || ''}</td>
                <td>
                    <button style ="background: none; border: none; color: blue;" onclick = "openEditModal(${i})">Sửa</button>
                    <button style ="background: none; border: none; color: red;" onclick = "deletelistBooking(${i})">Xóa</button>
                    </td>
            </tr>
        `;
    }
    tabledata.innerHTML = html;
}
renderdataEl ();



function addlistBooking () {
  let className = document.querySelector("select[name='className']").value;
  let date = document.querySelector("input[name='date']").value;
  let time = document.querySelector("select[name='time']").value;
  let name = userLogin.name;
  let email = userLogin.email;

  if (className == "" || date == "" || time == "") {
    return;
  }

  // ✅ Kiểm tra trùng lịch
  let isDuplicate = listBooking.some(b => b.date === date && b.time === time);
  if (isDuplicate) {
    // const modalAdd = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
    // modalAdd.hide();
    const modalError = new bootstrap.Modal(document.getElementById("erorr"));
    modalError.show();
  
  } else {

  let newlistBooking = {
      className: className,
      date: date,
      time: time,
      name: name,
      email: email
  }

  listBooking.push(newlistBooking);
  updateData();

  document.getElementById("bookingForm").reset();
  renderdataEl();

  // const modalAdd = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
  // modalAdd.hide();
  const modal = new bootstrap.Modal(document.getElementById("addlistBooking"));
  modal.show();
}
}


let currentEditIndex = null;

function editlistBooking(index) {
  let className = document.querySelector("#editBookingForm select[name='className']").value;
  let date = document.querySelector("#editBookingForm input[name='date']").value;
  let time = document.querySelector("#editBookingForm select[name='time']").value;
  let name = userLogin.name;
  let email = userLogin.email;

  let isDuplicate = listBooking.some((b, i) => i !== index && b.date === date && b.time === time);
  if (isDuplicate) {
    const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal2"));
    modal.hide();
    const modalError = new bootstrap.Modal(document.getElementById("erorr"));
    modalError.show();
    
  } else {

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

  const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal2"));
  modal.hide();
  const modaledit = new bootstrap.Modal(document.getElementById("editlistBooking"));
  modaledit.show();
}
}




// function openAddModal(index) {
//   currentAddIndex = index;
//   const booking = listBooking[index];

//   document.querySelector("#exampleModal select[name='className']").value = booking.className;
//   document.querySelector("#exampleModal input[name='date']").value = booking.date;
//   document.querySelector("#exampleModal select[name='time']").value = booking.time;

//   const addModal = new bootstrap.Modal(document.getElementById('exampleModal'));
//   addModal.show();
// }


//   const addForm = document.querySelector("#AddBookingForm");

//   addForm.addEventListener("submit", function (event) {
//       event.preventDefault();
//       if (!addForm.checkValidity()) {
//           event.stopPropagation();
//           addForm.classList.add("was-validated");
//           return;
//       }

//       addlistBooking(currentAddIndex);
//   });






function openEditModal(index) {
  currentEditIndex = index;
  const booking = listBooking[index];

  document.querySelector("#exampleModal2 select[name='className']").value = booking.className;
  document.querySelector("#exampleModal2 input[name='date']").value = booking.date;
  document.querySelector("#exampleModal2 select[name='time']").value = booking.time;

  const editModal = new bootstrap.Modal(document.getElementById('exampleModal2'));
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






