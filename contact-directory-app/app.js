const name = document.getElementById("name");
const surname = document.getElementById("surname");
const mail = document.getElementById("mail");
const listOfPersons = document.querySelector(".list-of-persons");
const form = document.getElementById("form-directory");
form.addEventListener("submit", saved);
listOfPersons.addEventListener("click", doPerson);

const allPersonInfo = [];
let selectedRow = undefined;

function doPerson(e) {
  if (e.target.classList.contains("btn--delete")) {
    const deleteTr = e.target.parentElement.parentElement;
    const deleteMail =
      e.target.parentElement.previousElementSibling.textContent;

    deleteFromDirectory(deleteTr, deleteMail);
    createInfo("Deleted successfully", true);
  } else if (e.target.classList.contains("btn--edit")) {
    console.log("editleme butonu");
    document.querySelector(".saveorupdate").value = "Update";
    const selectedTr = e.target.parentElement.parentElement;
    const updateMail = selectedTr.cells[2].textContent;

    name.value = selectedTr.cells[0].textContent;
    surname.value = selectedTr.cells[1].textContent;
    mail.value = selectedTr.cells[2].textContent;

    selectedRow = selectedTr;
  }
}

function deleteFromDirectory(deleteTr, deleteMail) {
  deleteTr.remove();
  console.log(deleteTr, deleteMail);
  allPersonInfo.forEach((person, index) => {
    if (person.mail === deleteMail) {
      allPersonInfo.splice(index, 1);
    }
  });
  deleteSpace();
  document.querySelector(".saveorupdate").value = "Save";
  // const dontDeletePerson = allPersonInfo.filter(function (person, index) {
  //   return person.mail !== deleteMail;
  // });
  // allPersonInfo.length = 0;
  // allPersonInfo.push(...dontDeletePerson);
}

function saved(e) {
  e.preventDefault();
  const addedPerson = {
    name: name.value,
    surname: surname.value,
    mail: mail.value,
  };
  const result = controllerInfo(addedPerson);

  if (result.status) {
    if (selectedRow) {
      //update
      updatePerson(addedPerson);
      createInfo("Updated successfully", true);
    } else {
      addPerson(addedPerson);
    }
  } else {
    createInfo(result.message, result.status);
    console.log(result.message);
  }
  //   console.log(addedPerson);
}

function updatePerson(person) {
  for (let i = 0; i < allPersonInfo.length; i++) {
    if (allPersonInfo[i].mail === selectedRow.cells[2].textContent) {
      allPersonInfo[i] = person;
      break;
    }
  }

  selectedRow.cells[0].textContent = person.name;
  selectedRow.cells[1].textContent = person.surname;
  selectedRow.cells[2].textContent = person.mail;

  document.querySelector(".saveorupdate").value = "Save";
  selectedRow = undefined;
}

function controllerInfo(person) {
  for (const value in person) {
    if (person[value]) {
      console.log("Her yer dolub");
    } else {
      const result = {
        status: false,
        message: "Don't leave empty space",
      };
      return result;
    }
  }
  deleteSpace();
  return {
    status: true,
    message: "Successfuly saved",
  };
}

function createInfo(message, status) {
  const createdInfo = document.createElement("div");
  createdInfo.textContent = message;
  createdInfo.className = "info";
  if (status) {
    createdInfo.classList.add("info--success");
  } else {
    createdInfo.classList.add("info--error");
  }

  document.querySelector(".container").insertBefore(createdInfo, form);

  setTimeout(() => {
    const deleteDiv = document.querySelector(".info");
    if (deleteDiv) {
      deleteDiv.remove(createdInfo);
    }
  }, 2000);
}

function deleteSpace() {
  name.value = "";
  surname.value = "";
  mail.value = "";
}

function addPerson(addedPerson) {
  const createdTr = document.createElement("tr");
  createdTr.innerHTML = `<td>${addedPerson.name}</td>
    <td>${addedPerson.surname}</td>
    <td>${addedPerson.mail}</td>
    <td>
      <button class="btn btn--edit">
        <i class="far fa-edit"></i>
      </button>
      <button class="btn btn--delete">
        <i class="far fa-trash-alt"></i>
      </button>
    </td>`;
  listOfPersons.appendChild(createdTr);
  allPersonInfo.push(addedPerson);
  createInfo("Successfuly saved", true);
}
