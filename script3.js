function Book(Name, price, author) {
  this.Name = Name;
  this.price = price;
  this.author = author;
}

function Author(Name, email) {
  this.Name = Name;
  this.email = email;
}
var a, b;
var myArr = [];
var editArr = [];
var deleteArr = [];
var indexesDelArr = [];
var cancelArr = [];
var saveArr = [];

var numberBook = document.querySelector(".numberBook");
var numBookInp = document.getElementById("nBook");
var okBtn = document.getElementById("ok");

var pageform = document.querySelector(".parent");
var table = document.querySelector("table");

pageform.style.display = "none";
table.style.display = "none";

var inputName = document.getElementsByClassName("name");
var inputPrice = document.getElementById("price");
var inputEmail = document.getElementById("email");

var spanName = document.getElementsByClassName("invalidName");
var spanPrice = document.getElementById("invalidPrice");
var spanEmail = document.getElementById("invalidEmail");

var reset = document.getElementById("reset");
var add = document.getElementById("add");
var done = document.getElementById("done");

var tbody = document.getElementsByTagName("tbody")[0];

//nubmer of books
numBookInp.addEventListener("input", function () {
  if (isNaN(numBookInp.value) || numBookInp.value == 0) {
    numBookInp.value = "";
  }
});

// ok button
okBtn.addEventListener("click", function () {
  if (numBookInp.value !== "") {
    pageform.style.display = "block";
    table.style.display = "table";
    numberBook.style.display = "none";
  }
});

// validation name
var namePattern = /^[A-Za-z\- ']+$/;

for (var i = 0; i < 2; i++) {
  (function (index) {
    inputName[index].addEventListener("input", function () {
      if (!namePattern.test(inputName[index].value)) {
        inputName[index].value = "";
      }
    });

    inputName[index].addEventListener("change", function () {
      if (inputName[index].value.length < 3) {
        displayInvalid(inputName[index], spanName[index], "Name");
      } else {
        spanName[index].style.display = "none";
      }
    });
  })(i);
}
// validation Price
inputPrice.addEventListener("input", function () {
  if (isNaN(inputPrice.value)) {
    inputPrice.value = "";
  }
});

inputPrice.addEventListener("change", function () {
  if (Number(inputPrice.value) < 10) {
    displayInvalid(inputPrice, spanPrice, "Price");
  } else {
    spanPrice.style.display = "none";
  }
});

// validation email

var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

inputEmail.addEventListener("change", function () {
  if (!emailPattern.test(inputEmail.value)) {
    displayInvalid(inputEmail, spanEmail, "Email");
  } else {
    spanEmail.style.display = "none";
  }
});

// reset values
reset.addEventListener("click", function () {
  emptyInputs();
});

// add values
var c = 0;

add.addEventListener("click", function () {
  displayRequired(inputName[0], spanName[0]);
  displayRequired(inputName[1], spanName[1]);
  displayRequired(inputPrice, spanPrice);
  displayRequired(inputEmail, spanEmail);

  if (checkNotEmptyInputs()) {
    if (Number(numBookInp.value) > c) {
      a = new Author(inputName[1].value, inputEmail.value);
      b = new Book(inputName[0].value, inputPrice.value, a);
      myArr.push(b);
      c++;
    }
  }

  //display table
  displayTable();

  // display done for each click in add button
  if (checkNotEmptyInputs()) {
    done.style.display = "block";
    setTimeout(function () {
      done.style.display = "none";
    }, 1000);
    // empty inputs
    emptyInputs();
  }

  //delete record from table
  deleteRecord();

  //edit records
  for (var i = 0; i < editArr.length; i++) {
    editArr[i].addEventListener("click", function () {
      var index = Number(this.getAttribute("index"));
      // console.log(index);
      toggleButton(index, "none", "inline");

      for (var j = 0; j < 4; j++) {
        editArr[
          indexesDelArr.indexOf(index)
        ].parentElement.parentElement.children[j].children[0].removeAttribute(
          "disabled"
        );
        editArr[
          indexesDelArr.indexOf(index)
        ].parentElement.parentElement.children[j].children[0].classList.add(
          "styleInput"
        );
      }
      cancelButton();
      saveButton();
    });
  }

  //end edit
});

function displayInvalid(input, span, str) {
  span.textContent = "*** Invalid " + str + " ***";
  span.style.display = "inline";
  input.value = "";
}

function displayRequired(input, span) {
  if (input.value == "") {
    span.textContent = "*** Field required *** ";
    span.style.display = "inline";
  }
}

function checkNotEmptyInputs() {
  if (
    inputName[0].value !== "" &&
    inputName[1].value !== "" &&
    inputPrice.value !== "" &&
    inputEmail.value !== ""
  )
    return true;
  else return false;
}
function emptyInputs() {
  inputName[0].value = "";
  inputName[1].value = "";
  inputPrice.value = "";
  inputEmail.value = "";
}

function displayTable() {
  for (var i = 0; i < c; i++) {
    if (Number(numBookInp.value) == c) {
      pageform.style.display = "none";
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td index='" +
        i +
        "'>" +
        '<input disabled type="text" value=' +
        myArr[i].Name +
        ">" +
        "</td><td index = " +
        i +
        ">" +
        '<input disabled type="text" value=' +
        myArr[i].price +
        ">" +
        "</td><td index=" +
        i +
        ">" +
        '<input disabled type="text" value=' +
        myArr[i].author.Name +
        ">" +
        "</td><td index=" +
        i +
        ">" +
        '<input disabled type="text" value=' +
        myArr[i].author.email +
        ">" +
        "</td><td index=" +
        i +
        ">" +
        '<input type="button" value="Edit" class="edit" index="' +
        i +
        '">' +
        '<input type="button" value="Save" class="save" index="' +
        i +
        '">' +
        "</td><td index=" +
        i +
        ">" +
        '<input type="button" value="Delete" class="delete" index="' +
        i +
        '">' +
        '<input type="button" value="Cancel" class="cancel" index="' +
        i +
        '">' +
        "</td>";
      tbody.appendChild(tr);
      indexesDelArr.push(Number(deleteArr[i].getAttribute("index")));
    }
    editArr = document.getElementsByClassName("edit");
    deleteArr = document.getElementsByClassName("delete");
    saveArr = document.getElementsByClassName("save");
    cancelArr = document.getElementsByClassName("cancel");
  }
}

//delete record from tabel and its data from stord arr
function deleteRecord() {
  for (var i = 0; i < deleteArr.length; i++) {
    deleteArr[i].addEventListener("click", function () {
      var index = Number(this.getAttribute("index"));
      myArr.splice(indexesDelArr.indexOf(index), 1);
      indexesDelArr.splice(indexesDelArr.indexOf(index), 1);
      this.parentElement.parentElement.remove();
    });
  }
}

// change delete to cancel and edit to save and the oppsite
function toggleButton(index, i, n) {
  deleteArr[indexesDelArr.indexOf(index)].style.display = i;
  editArr[indexesDelArr.indexOf(index)].style.display = i;
  saveArr[indexesDelArr.indexOf(index)].style.display = n;
  cancelArr[indexesDelArr.indexOf(index)].style.display = n;
}

//cancel button
function cancelButton() {
  for (var i = 0; i < cancelArr.length; i++) {
    cancelArr[i].addEventListener("click", function () {
      var index = Number(this.getAttribute("index"));
      for (var j = 0; j < 4; j++) {
        cancelArr[
          indexesDelArr.indexOf(index)
        ].parentElement.parentElement.children[j].children[0].setAttribute(
          "disabled",
          true
        );
        cancelArr[
          indexesDelArr.indexOf(index)
        ].parentElement.parentElement.children[j].children[0].classList.remove(
          "styleInput"
        );
      }

      cancelArr[
        indexesDelArr.indexOf(index)
      ].parentElement.parentElement.children[0].children[0].value =
        myArr[indexesDelArr.indexOf(index)].Name;
      cancelArr[
        indexesDelArr.indexOf(index)
      ].parentElement.parentElement.children[1].children[0].value =
        myArr[indexesDelArr.indexOf(index)].price;
      cancelArr[
        indexesDelArr.indexOf(index)
      ].parentElement.parentElement.children[2].children[0].value =
        myArr[indexesDelArr.indexOf(index)].author.Name;
      cancelArr[
        indexesDelArr.indexOf(index)
      ].parentElement.parentElement.children[3].children[0].value =
        myArr[indexesDelArr.indexOf(index)].author.email;
      toggleButton(index, "inline", "none");
    });
  }
}

//save button
function saveButton() {
  for (var i = 0; i < saveArr.length; i++) {
    saveArr[i].addEventListener("click", function () {
      var index = Number(this.getAttribute("index"));
      for (var j = 0; j < 4; j++) {
        saveArr[
          indexesDelArr.indexOf(index)
        ].parentElement.parentElement.children[j].children[0].setAttribute(
          "disabled",
          true
        );
        saveArr[
          indexesDelArr.indexOf(index)
        ].parentElement.parentElement.children[j].children[0].classList.remove(
          "styleInput"
        );
      }
      toggleButton(index, "inline", "none");

      myArr[indexesDelArr.indexOf(index)].Name =
        saveArr[
          indexesDelArr.indexOf(index)
        ].parentElement.parentElement.children[0].children[0].value;
      myArr[indexesDelArr.indexOf(index)].price =
        saveArr[
          indexesDelArr.indexOf(index)
        ].parentElement.parentElement.children[1].children[0].value;
      myArr[indexesDelArr.indexOf(index)].author.Name =
        saveArr[
          indexesDelArr.indexOf(index)
        ].parentElement.parentElement.children[2].children[0].value;
      myArr[indexesDelArr.indexOf(index)].author.email =
        saveArr[
          indexesDelArr.indexOf(index)
        ].parentElement.parentElement.children[3].children[0].value;
    });
  }
}
