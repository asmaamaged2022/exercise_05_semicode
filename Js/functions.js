function getStudent(id) {
  let newStudent = { id: id };
  formInputs.forEach((formInput) => {
    let name = formInput.name,
      value = formInput.value;
    newStudent[name] = value;
  });
  return newStudent;
}
function showStudent(student) {
  tbody.innerHTML += ` 
    <tr data-student-id="${student.id}">
        <th>${student.id}</th>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.phone}</td>
        <td class="text-nowrap">
          <button class="btn btn-info text-light me-2" onclick="insertStudentIntoForm(${student.id})">Edit</button>
          <button class="btn btn-danger" onclick="showPopup(${student.id})" data-type="del">Delete</button>
        </td>
    </tr>`;
}
function checkInput(input) {
  let inputValue = input.value,
    regex,
    inputName = input.name,
    inputError = document.querySelector(`p.alert[data-error-name="${inputName}"]`);
  if (inputName == "firstName" || inputName == "lastName") {
    regex = /^[A-Za-z]{3,}$/;
  } else if (inputName == "email") {
    regex = /^[A-Za-z]+[a-zA-Z0-9\.\-_]+@(gmail|yahoo)\.(com|org)$/;
  } else if (inputName == "age") {
    regex = /^[0-9]{1,2}$/;
  } else if (inputName == "phone") {
    regex = /^(\+02)?01(0|1|2|5)[0-9]{8}$/;
  }
  if (inputValue == "") {
    inputError.textContent = "This field is required";
    inputError.classList.remove("d-none");
    input.classList.add("is-invalid");
  } else if (!regex.test(inputValue)) {
    inputError.textContent = "Invalid Field";
    inputError.classList.remove("d-none");
    input.classList.add("is-invalid");
  } else {
    inputError.classList.add("d-none");
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
}
function resetForm() {
  formElement.reset();
  formInputs.forEach(function (input) {
    let inputName = input.name,
      inputError = document.querySelector(`p.alert[data-error-name="${inputName}"]`);
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
    inputError.classList.add("d-none");
  });
  formBtn.textContent = "add";
  formBtn.classList.add("btn-success");
  formBtn.classList.remove("btn-info", "text-light");
  formElement.setAttribute("data-type", "add");
}
function updateLocalStorage() {
  localStorage.setItem("Students", JSON.stringify(studentArr));
  localStorage.setItem("id", id);
}
function showAllStudents(data) {
  tbody.innerHTML = "";
  data.forEach(function (student) {
    showStudent(student);
  });
}
function deleteStudent(id) {
  studentArr = studentArr.filter(function (item) {
    return item.id != id;
  });
  updateLocalStorage();
  let trEle = document.querySelector(`tr[data-student-id="${id}"]`);
  if (trEle) {
  trEle.remove();
}
  checkEmpty();
}
// with sweet alert
// function deleteStudent(id) {
//   Swal.fire({
//     title: "Are You Sure?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Yes",
//     denyButtonText: "Cancel",
//   }).then((e) => {
//     if (e.isConfirmed) {
//       studentArr = studentArr.filter(function (item) {
//         return item.id != id;
//       });

//       updateLocalStorage();

//       let trEle = document.querySelector(`tr[data-student-id="${id}"]`);
//       trEle.remove();
//       checkEmpty();

//       Swal.fire("Delete!", "", "success");
//     }
//   });
// }
function insertStudentIntoForm(id) {
  back.classList.remove("d-none");
  let del = document.querySelector('button[data-type="del"]');
  del.setAttribute("disabled", "true");
  resetForm();
  let currentStudent = studentArr.find(function (item) {
    return item.id == id;
  });
  formInputs.forEach(function (input) {
    input.value = currentStudent[input.name];
  });
  formBtn.textContent = "edit";
  formBtn.classList.remove("btn-success");
  formBtn.classList.add("btn-info", "text-light");
  formElement.setAttribute("data-type", "edit");
  formElement.setAttribute("data-student-id", currentStudent.id);
}
function addStudent() {
  let student = getStudent(++id);
  studentArr.push(student);
  updateLocalStorage();
  showStudent(student);
  checkEmpty();
  resetForm();
}
function editStudent() {
  let currentStudentId = formElement.getAttribute("data-student-id"),
    student = getStudent(currentStudentId),
    indexOfCurrentStudent = studentArr.findIndex((item) => item.id == currentStudentId);
  studentArr[indexOfCurrentStudent] = student;
  updateLocalStorage();
  let trEle = tbody.querySelector(`tr[data-student-id="${currentStudentId}"]`);
  trEle.innerHTML = `
   <th>${student.id}</th>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.phone}</td>
        <td class="text-nowrap">
          <button class="btn btn-info text-light me-2" onclick="insertStudentIntoForm(${student.id})">Edit</button>
          <button class="btn btn-danger" onclick="showPopup(${student.id})" data-type="del">Delete</button>
        </td>`;
  reLode();
}
function reLode() {
  resetForm();
  let del = document.querySelector('button[data-type="del"]');
  del.removeAttribute("disabled");
  back.classList.add("d-none");
}
function checkEmpty() {
  let alert = document.querySelector(".data");
  if (studentArr.length == 0) {
    alert.classList.remove("d-none");
  } else {
    alert.classList.add("d-none");
  }
}
function showPopup(id) {
  Popup.classList.add("active");
  delBtnInPopup.addEventListener("click", function () {
    deleteStudent(id);
    hidePopup();
  });
}
function hidePopup() {
  Popup.classList.remove("active");
}
