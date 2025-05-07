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

// Fake data mặc định (seed)
const defaultList = [
  { className: "Zumba", date: "2025-05-15", time: "11:00 - 13:00", name: "Minh Nhật", email: "minhnhat@example.com" },
  { className: "Zumba", date: "2025-04-12", time: "11:00 - 13:00", name: "Minh Nhật", email: "minhnhat@example.com" },
  { className: "Yoga",  date: "2025-05-01", time: "13:00 - 15:00", name: "Minh Nhật", email: "minhnhat@example.com" },
  { className: "Zumba", date: "2025-05-16", time: "11:00 - 13:00", name: "Minh Nhật", email: "minhnhat@example.com" },
  { className: "Gym",   date: "2025-05-21", time: "11:00 - 13:00", name: "Lê Cường",  email: "lecuong@example.com" },
  { className: "Gym",   date: "2025-04-28", time: "11:00 - 13:00", name: "Minh Nhật", email: "minhnhat@example.com" },
  { className: "Yoga",  date: "2025-05-30", time: "09:00 - 11:00", name: "Minh Nhật", email: "minhnhat@example.com" },
  { className: "Gym",   date: "2025-05-18", time: "09:00 - 11:00", name: "Minh Nhật", email: "minhnhat@example.com" },
  { className: "Yoga",  date: "2025-05-22", time: "09:00 - 11:00", name: "Minh Nhật", email: "minhnhat@example.com" },
  { className: "Yoga",  date: "2025-05-12", time: "07:00 - 09:00", name: "Minh Nhật", email: "minhnhat@example.com" },
];

// Load từ localStorage, hoặc seed bằng defaultList
let listBooking = [];
if (!localStorage.getItem("listBooking")) {
  listBooking = defaultList.slice();           // khởi tạo từ seed
  localStorage.setItem("listBooking", JSON.stringify(listBooking));
} else {
  listBooking = JSON.parse(localStorage.getItem("listBooking"));
}


  function updateData() {
    localStorage.setItem("listBooking", JSON.stringify(listBooking));
  }



  let tabledata = document.querySelector("tbody");
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || '{}');

 function renderdataEl() {
  const tbody = document.querySelector("tbody");
  // Lấy email của user hiện tại
  const me = userLogin.email;

  // Lọc chỉ những booking của chính user đó
  const mine = listBooking.filter(b => b.email === me);

  // Xây dựng HTML
  let html = "";
  for (let i = 0; i < mine.length; i++) {
    html += `
      <tr>
        <td>${mine[i].className}</td>
        <td>${mine[i].date}</td>
        <td>${mine[i].time}</td>
        <td>${mine[i].name || ""}</td>
        <td>${mine[i].email || ""}</td>
        <td>
          <button style="background: none; border: none; color: blue;"
                  onclick="openEditModal(${i})">Sửa</button>
          <button style="background: none; border: none; color: red;"
                  onclick="deletelistBooking(${i})">Xóa</button>
        </td>
      </tr>
    `;
  }

  tbody.innerHTML = html;
}




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
  listBooking.push({ className, date, time,
                     name: userLogin.name,
                     email: userLogin.email });
  updateData();
  render();

  // đóng modal Thêm, mở modal Thành công
  addModal.hide();
  successModal.show();

  bookingForm.reset();
  bookingForm.classList.remove("was-validated");
});


// hàm sửa
let currentEditIndex = null;

function editlistBooking(index) {
  // Lấy giá trị mới
  const className = document.querySelector("#editBookingForm select[name='className']").value;
  const date      = document.querySelector("#editBookingForm input[name='date']").value;
  const time      = document.querySelector("#editBookingForm select[name='time']").value;

  // Kiểm tra trùng, bỏ qua chính bản ghi đang sửa (i === index)
  const isDuplicate = listBooking.some((b, i) =>
    i !== index &&
    b.date === date &&
    b.time === time
  );

  if (isDuplicate) {
    editModal.hide();
    errorModal.show();
    return;
  }

  // Nếu không trùng thì cập nhật
  listBooking[index] = { className, date, time, name: userLogin.name, email: userLogin.email };
  updateData();
  render();
  editModal.hide();
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
      render(); // render lại bảng
      deleteIndex = null; // reset lại chỉ số
    }
  });



// phân trang
// --- cấu hình phân trang ---
const itemsPerPage = 5;
let currentPage   = 1;

// Lấy tất cả booking của user đang đăng nhập
function getMyBookings() {
  return listBooking.filter(b => b.email === userLogin.email);
}

// Lấy slice theo trang
function getPaginatedData() {
  const all = getMyBookings();
  const start = (currentPage - 1) * itemsPerPage;
  return all.slice(start, start + itemsPerPage);
}

// Vẽ lại table
function renderData() {
  const data = getPaginatedData();
  const tbody = document.querySelector("tbody");
  let html = "";
  data.forEach((item, idx) => {
    const realIndex = (currentPage - 1) * itemsPerPage + idx;
    html += `
      <tr>
        <td>${item.className}</td>
        <td>${item.date}</td>
        <td>${item.time}</td>
        <td>${item.name || ""}</td>
        <td>${item.email || ""}</td>
        <td>
          <button style="background:none;border:none;color:blue"
                  onclick="openEditModal(${realIndex})">Sửa</button>
          <button style="background:none;border:none;color:red"
                  onclick="deletelistBooking(${realIndex})">Xóa</button>
        </td>
      </tr>`;
  });
  tbody.innerHTML = html;
}

// Vẽ các nút phân trang
function renderPagination() {
  const total = Math.ceil(getMyBookings().length / itemsPerPage);
  const ul    = document.getElementById("pagination");
  let html = `
    <li class="page-item ${currentPage===1?'disabled':''}">
      <button class="page-link" onclick="goToPage(${currentPage-1})" ${currentPage===1?'disabled':''}>&laquo;</button>
    </li>`;
  for (let i = 1; i <= total; i++) {
    html += `
      <li class="page-item ${i===currentPage?'active':''}">
        <button class="page-link" onclick="goToPage(${i})">${i}</button>
      </li>`;
  }
  html += `
    <li class="page-item ${currentPage===total?'disabled':''}">
      <button class="page-link" onclick="goToPage(${currentPage+1})" ${currentPage===total?'disabled':''}>&raquo;</button>
    </li>`;
  ul.innerHTML = html;
}

// Chuyển trang
function goToPage(page) {
  const total = Math.ceil(getMyBookings().length / itemsPerPage);
  if (page < 1 || page > total) return;
  currentPage = page;
  render();
}

// Gộp render dữ liệu + pagination
function render() {
  renderData();
  renderPagination();
}

// Thay tất cả các lần gọi renderdataEl() thành render()
render();






