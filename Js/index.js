let formElement = document.querySelector("form"),
  formInputs = formElement.querySelectorAll("input"),
  id = 0,
  studentArr = [],
  back = document.querySelector(".back"),
  tbody = document.querySelector("tbody"),
  formBtn = formElement.querySelector("button"),
  searchInput = document.querySelector("#Search input"),
  Popup=document.getElementById("Popup"),
  delBtnInPopup=Popup.querySelector(".delete");

if (localStorage.getItem("Students") == null) {
  localStorage.setItem("Students", JSON.stringify(studentArr));
  localStorage.setItem("id", id);
} else {
  studentArr = JSON.parse(localStorage.getItem("Students"));
  id = +localStorage.getItem("id");
}
checkEmpty();
showAllStudents(studentArr);

// Submit bnt
formElement.addEventListener("submit", function (e) {
  e.preventDefault();

  //blur is removed to make sure i test all filed
  let focusInput = document.querySelector("input:focus") ?? undefined;
  focusInput?.blur();
  //there are error don’t submit
  let checkInvalidInput = formElement.querySelector(".is-invalid");
  if (checkInvalidInput !== null) {
    return;
  }
  let formType = formElement.getAttribute("data-type");
  if (formType == "add") {
    addStudent();
  } else if (formType == "edit") {
    editStudent();
  }
});

//to check inputs
formInputs.forEach(function (input) {
  input.addEventListener("blur", function () {
    checkInput(input);
  });
});

searchInput.addEventListener("keyup", function () {
  let value = searchInput.value.toLowerCase();

  filteredStudent = studentArr.filter(function (item) {
    return (
      item.firstName.toLowerCase().includes(value) ||
      item.lastName.toLowerCase().includes(value) ||
      item.email.toLowerCase().includes(value) ||
      item.age.toString().includes(value) ||
      item.phone.toString().includes(value) ||
      item.id.toString().includes(value)
    );
  });

  showAllStudents(filteredStudent);
});
let cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", function (e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.addEventListener("mouseleave", function () {
  cursor.style.display = "none";
});

document.addEventListener("mouseenter", function () {
  cursor.style.display = "block";
});