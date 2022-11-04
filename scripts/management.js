const addLevelBtn = document.querySelector("#addLevel");
const levelContainer = document.querySelector("#levelContainer");
const addStaffBtn = document.querySelector("#addStaff");
const staffContainer = document.querySelector("#staffContainer");
const levels = [];
const staffs = [];

addLevelBtn.addEventListener("click", () => {
  greyBackground();
  addModal("Add", "undefined", "level");
  addListeners("Add", "undefined", "level");
  findInputs("level");
});

addStaffBtn.addEventListener("click", () => {
  greyBackground();
  addModal("Add", "undefined", "staff");
  addListeners("Add", "undefined", "staff");
  findInputs("staff");
});

// grey out the background when modal is active
function greyBackground() {
  const background = document.querySelector(".background");
  if (background) {
    document.body.removeChild(background);
  } else {
    const element = document.createElement("div");
    element.classList.add("background");
    document.body.appendChild(element);
  }
}
// Add the modal to the centre of the page when the add level button is selected
function addModal(state, value, property) {
  const element = document.createElement("div");
  if (property === "level") {
    element.classList.add("levelModalPopUp");
    element.innerHTML = `<form class='form'>
        <div class="heading p-3 border-bottom d-flex align-items-center justify-content-between">
          <h3 class="mb-0 text-center">${state} Level</h3>
          <i class="fa-solid fa-rectangle-xmark closeBtn"></i>
        </div>
        <div class="content p-3 border-bottom">
          <input
            type="number"
            class="rounded w-100 border border-secondary p-2 text-center modalInput"
            id="levelInput"
            placeholder="Add Level Here"
          />
          <p class='alert d-none mb-0'>Please Fill in Above</p>
        </div>
        <div class="footer d-flex gap-2 p-3 justify-content-end">
          <button type="button" class="btn btn-secondary closeBtn">Close</button>
          <button type="submit" class="btn btn-primary submitBtn">${state} Level</button>
        </div>
      </form>`;
    document.body.appendChild(element);
    if (state === "Edit") {
      document.getElementById("levelInput").value = value;
    }
  } else {
    element.classList.add("staffModalPopUp");
    element.innerHTML = `<form class="form">
        <div
          class="heading p-3 border-bottom d-flex align-items-center justify-content-between"
        >
          <h3 class="mb-0 text-center">${state} Staff</h3>
          <i class="fa-solid fa-rectangle-xmark closeBtn"></i>
        </div>
        <div class="content p-3 border-bottom">
          <div class="row g-3">
            <div class="col-12">
              <input
                type="text"
                class="rounded w-100 border border-secondary p-2 modalInput"
                id="firstNameInput"
                placeholder="First Name"
              />
              <p class='alert d-none mb-0'>Please Fill in Above</p>
            </div>
            <div class="col-12">
              <input
                type="text"
                class="rounded w-100 border border-secondary p-2 modalInput"
                id="secondNameInput"
                placeholder="Last Name"
              />
              <p class='alert d-none mb-0'>Please Fill in Above</p>
            </div>
            <div class="col-12">
              <input
                type="text"
                class="rounded w-100 border border-secondary p-2 modalInput"
                id="usernameInput"
                placeholder="Username"
              />
              <p class='alert d-none mb-0'>Please Fill in Above</p>
            </div>
            <div class="col-12">
              <input
                type="text"
                class="rounded w-100 border border-secondary p-2 modalInput"
                id="passwordInput"
                placeholder="Password"
              />
              <p class='alert d-none mb-0'>Please Fill in Above</p>
            </div>
          </div>
        </div>
        <div class="footer d-flex gap-2 p-3 justify-content-end">
          <button type="button" class="btn btn-secondary closeBtn">
            Close
          </button>
          <button type="submit" class="btn btn-primary submitBtn">
            ${state} Staff
          </button>
        </div>
      </form>
`;
    document.body.appendChild(element);
    if (state === "Edit") {
      document.getElementById("levelInput").value = value;
    }
  }
}
// add the listeners to all of the buttons on the modal form
function addListeners(state, value, property) {
  const closeBtn = document.querySelectorAll(".closeBtn");
  const form = document.querySelector(".form");
  const background = document.querySelector(".background");
  const modal = document.querySelector(`.${property}ModalPopUp`);
  const inputs = document.getElementsByTagName("input");

  background.addEventListener("click", () => {
    background.remove();
    modal.remove();
  });

  for (const close of closeBtn) {
    close.addEventListener("click", () => {
      background.remove();
      modal.remove();
    });
  }

  for (const input of inputs) {
    input.addEventListener("input", () => {
      const parent = input.parentElement;
      const alert = parent.querySelector(".alert");
      if (alert) {
        alert.remove();
      }
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (state === "Edit") {
      removeLevel(value);
      inputCheck(property);
    } else {
      inputCheck(property);
    }
  });
}
function findInputs(property) {
  const container = document.querySelector(`.${property}ModalPopUp`);
  const inputs = container.getElementsByTagName("input");
  const inputObject = {};
  for (const input of inputs) {
    inputObject[input.id] = input.value;
  }
  return inputObject;
}
function inputCheck(property) {
  let access = "granted";
  const inputs = findInputs(property);

  for (const input in inputs) {
    if (inputs[input] === "") {
      const elementParent = document.getElementById(`${input}`).parentElement;
      elementParent.querySelector(".alert").classList.remove("d-none");
      access = "denied";

      //   this is where you are up to. you need to iterate through the object and remove the white space. for the input values.
    }
  }
  if (access === "granted") {
    document.querySelector(".background").remove();
    document.querySelector(`.${property}ModalPopUp`).remove();
    if (property === "level") {
      addLevel(inputs, "no", property);
    } else {
      addStaff(inputs, "no", property);
    }
  }
}
// remove the level item from the array when the submit button is fired and the state is in "EDIT"
function removeLevel(value) {
  const index = levels.indexOf(value);
  levels.splice(index, 1);
}
// add Level when the submit level or edit level button is fired
function addLevel(input, adjust, property) {
  const level = input.levelInput;

  if (adjust === "no") {
    levels.push(level);
    // sorting levels
    levels.sort((a, b) => a - b);
    // mapping the HTML to be injected into the document
  }

  let count = 0;
  const htmlInput = levels
    .map((level) => {
      count++;
      return `<div class="row text-center gx-0 align-items-center p-2 border rounded mb-2 level">
              <div class="col-4">
                <p class="mb-0">level ${count}</p>
              </div>
              <div class="col-4">
                <p class="mb-0 target">Target: ${level}</p>
              </div>
              <div class="col-4 d-flex justify-content-center gap-4">
                <i class="fa-solid fa-pen-to-square text-secondary pointer edit"></i>
                <i class="fa-solid fa-trash-can text-danger delete"></i>
              </div>
            </div>
           `;
    })
    .join("");
  levelContainer.innerHTML = htmlInput;
  addEditListener(property);
  addDeleteListener(property);
}
function addStaff(input, adjust, property) {
  staffs.push(input);
  console.log(staffs);
  const html = staffs
    .map((staff) => {
      return `<div class="row text-center align-items-center p-2 gx-0 border rounded mb-2 level">
    <div class="col-6">
    <p class="mb-0 fullName" >${
      staff.firstNameInput + " " + staff.secondNameInput
    }</p>
  </div>
  <div class="col-6 d-flex justify-content-center gap-4">
    <i class="fa-solid fa-pen-to-square text-secondary pointer edit"></i>
    <i class="fa-solid fa-trash-can text-danger delete"></i>
  </div>
</div>`;
    })
    .join("");

  staffContainer.innerHTML = html;
  addEditListener(property);
  addDeleteListener(property);
}
// add listener to the edit button when it is added to the HTML workflow
function addEditListener(property) {
  const container = document.getElementById(`${property}Container`);
  const edits = container.getElementsByClassName("edit");
  if (property === "level") {
    for (const edit of edits) {
      edit.addEventListener("click", (e) => {
        const parent = e.target.parentElement.parentElement;
        const value = parent
          .querySelector(".target")
          .textContent.replace("Target: ", "");

        addModal("Edit", value, property);
        greyBackground();
        addListeners("Edit", value, property);
      });
    }
  } else {
    for (const edit of edits) {
      edit.addEventListener("click", (e) => {
        const parent = e.target.parentElement.parentElement;
        const fullName = parent.querySelector(".fullName").textContent;
        const brokenName = fullName.split(" ");
        console.log(brokenName);
      });
    }
  }
}
function addDeleteListener(property) {
  const container = document.getElementById(`${property}Container`);
  const deleteBtns = container.getElementsByClassName("delete");
  if (property === "level") {
    for (const deleteBtn of deleteBtns) {
      deleteBtn.addEventListener("click", (e) => {
        const parent = e.target.parentElement.parentElement;
        parent.remove();
        const value = parent
          .querySelector(".target")
          .textContent.replace("Target: ", "");
        const index = levels.indexOf(value);
        levels.splice(index, 1);
        addLevel("undefined", "yes", property);
      });
    }
  } else {
  }
}

~=