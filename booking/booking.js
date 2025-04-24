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
        time : "07:00 - 09:00",
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
                <td>${userLogin.name}</td>
                <td>${userLogin.email}</td>
                <td>
                    <button style ="background: none; border: none; color: blue;" onclick = "editlistBooking(${i})">Sửa</button>
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
   
  
}

