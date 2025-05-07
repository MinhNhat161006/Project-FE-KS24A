//biểu đồ hiện lên khi bấm và calendar
let scheduleChart = null;
document.addEventListener('DOMContentLoaded', () => {
  renderChart();
});



if (!localStorage.getItem("listBooking")) {
  localStorage.setItem("listBooking", JSON.stringify(listBooking));
} else {
  listBooking = JSON.parse(localStorage.getItem("listBooking"));
}

function updateData() {
  localStorage.setItem("listBooking", JSON.stringify(listBooking));
  render();  // mỗi khi thêm/sửa/xóa thì gọi lại để cập nhật UI
}

// Cấu hình phân trang
const itemsPerPage = 5;
let currentPage = 1;

// render data vào <tbody>
let tabledata = document.querySelector("tbody");
function renderdataEl(data = []) {
  let html = '';
  data.forEach((item, i) => {
    html += `
      <tr>
        <td>${item.className}</td>
        <td>${item.date}</td>
        <td>${item.time}</td>
        <td>${item.name || ''}</td>
        <td>${item.email || ''}</td>
        <td>
          <button class="btn btn-link p-0" onclick="openEditModal(${(currentPage-1)*itemsPerPage + i})">Sửa</button>
          <button class="btn btn-link text-danger p-0" onclick="deletelistBooking(${(currentPage-1)*itemsPerPage + i})">Xóa</button>
        </td>
      </tr>`;
  });
  tabledata.innerHTML = html;
}

// tính slice dữ liệu cho trang hiện tại
function getPaginatedData() {
  const start = (currentPage - 1) * itemsPerPage;
  return listBooking.slice(start, start + itemsPerPage);
}

// sinh nút phân trang
function renderPagination() {
  const totalPages = Math.ceil(listBooking.length / itemsPerPage);
  const container = document.getElementById('pagination');
  let html = '';

  // nút Prev
  html += `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <button class="page-link" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
        &laquo;
      </button>
    </li>`;

  // các nút số (nếu bạn muốn giới hạn 5 nút số thì bổ sung logic window, nhưng để đơn giản ở đây hiện hết)
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <button class="page-link" onclick="goToPage(${i})">${i}</button>
      </li>`;
  }

  // nút Next
  html += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <button class="page-link" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
        &raquo;
      </button>
    </li>`;

  container.innerHTML = html;
}

// chuyển trang
function goToPage(page) {
  const totalPages = Math.ceil(listBooking.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  render();
}

// render full: data + pagination
function render() {
  renderdataEl(getPaginatedData());
  renderPagination();
}

// gọi lần đầu
render();





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
  render();
  renderChart();

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
  const isDuplicate = listBooking.some((b, i) => i !== index && b.date === date && b.time === time);
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
  render();
  renderChart();
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






//mở form edit
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
      renderChart();
      deleteIndex = null; // reset lại chỉ số
    }
  });










function updateStats() {
  let gymCount = 0;
  let yogaCount = 0;
  let zumbaCount = 0;

  // Đếm số lượng theo className
  for (let i = 0; i < listBooking.length; i++) {
    const booking = listBooking[i];
    if (booking.className === "Gym") {
      gymCount++;
    } else if (booking.className === "Yoga") {
      yogaCount++;
    } else if (booking.className === "Zumba") {
      zumbaCount++;
    }
  }

  // Gán số lượng vào HTML
  document.querySelector("#gym p").textContent = gymCount;
  document.querySelector("#yoga p").textContent = yogaCount;
  document.querySelector("#zumba p").textContent = zumbaCount;
}



document.addEventListener('DOMContentLoaded', () => {
  // 1) Lấy mảng đã lưu
  const listBooking = JSON.parse(localStorage.getItem('listBooking') || '[]');

  // 2) Đếm số lượng
  const counts = listBooking.reduce((acc, b) => {
    if (b.className === 'Gym')   acc.gym++;
    if (b.className === 'Yoga')  acc.yoga++;
    if (b.className === 'Zumba') acc.zumba++;
    return acc;
  }, { gym: 0, yoga: 0, zumba: 0 });

  // 3) Lấy context
  const ctx = document
    .getElementById('scheduleChart')
    .getContext('2d');

  // 4) Vẽ biểu đồ cột với 3 dataset
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Số lượng'],     // chỉ có 1 nhóm cột
      datasets: [
        {
          label: 'Gym',
          data: [counts.gym],
          backgroundColor: '#3B82F6',
        },
        {
          label: 'Yoga',
          data: [counts.yoga],
          backgroundColor: '#10B981',
        },
        {
          label: 'Zumba',
          data: [counts.zumba],
          backgroundColor: '#8B5CF6',
        },
      ]
    },
    options: {
      scales: {
        x: {
          // mỗi dataset đều nằm chung 1 tick "Số lượng"
          stacked: false,
        },
        y: {
          beginAtZero: true,
          ticks: { precision: 0 }
        }
      },
      plugins: {
        legend: {
          display: true,   // hiển thị legend để click tắt/bật
          position: 'top'
        }
      }
    }
  });
});

updateStats()


// w3 school onchange
const selClass = document.getElementById("searchClassName");
const inpEmail = document.getElementById("searchEmail");
const inpDate  = document.getElementById("searchDate");

selClass.addEventListener("change", filterlistBooking);
inpEmail.addEventListener("input", filterlistBooking);
inpDate.addEventListener("change", filterlistBooking);

// 2. Hàm lọc chung
function filterlistBooking() {
  const c = selClass.value;
  const e = inpEmail.value.trim().toLowerCase();
  const d = inpDate.value;

  const filtered = listBooking.filter(b => {
    const okClass = !c || b.className === c;
    const okEmail = !e || b.email.toLowerCase().includes(e);
    const okDate  = !d || b.date === d;
    return okClass && okEmail && okDate;
  });

  renderdataEl(filtered);
}


// biểu đồ
function renderChart() {
  // Đếm số lượng mới
  const counts = listBooking.reduce((acc, b) => {
    if (b.className === 'Gym')   acc.gym++;
    if (b.className === 'Yoga')  acc.yoga++;
    if (b.className === 'Zumba') acc.zumba++;
    return acc;
  }, { gym: 0, yoga: 0, zumba: 0 });

  // Cập nhật thống kê
  document.querySelector("#gym p").textContent = counts.gym;
  document.querySelector("#yoga p").textContent = counts.yoga;
  document.querySelector("#zumba p").textContent = counts.zumba;

  // Nếu chart đã tồn tại thì chỉ update
  if (scheduleChart) {
    scheduleChart.data.datasets[0].data = [counts.gym];
    scheduleChart.data.datasets[1].data = [counts.yoga];
    scheduleChart.data.datasets[2].data = [counts.zumba];
    scheduleChart.update();
    return;
  }

  // Nếu chưa có thì tạo mới
  const ctx = document.getElementById('scheduleChart').getContext('2d');
  scheduleChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Số lượng'],
      datasets: [
        {
          label: 'Gym',
          data: [counts.gym],
          backgroundColor: '#3B82F6',
        },
        {
          label: 'Yoga',
          data: [counts.yoga],
          backgroundColor: '#10B981',
        },
        {
          label: 'Zumba',
          data: [counts.zumba],
          backgroundColor: '#8B5CF6',
        },
      ]
    },
    options: {
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } }
      },
      plugins: {
        legend: { display: true, position: 'top' }
      }
    }
  });
}
