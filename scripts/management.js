const addLevelBtn = document.querySelector("#addLevel");
const levelContainer = document.querySelector("#levelContainer");
const addStaffBtn = document.querySelector("#addStaff");
const staffContainer = document.querySelector("#staffContainer");
const modal = document.getElementsByClassName('modal')
const levels = [];
const staffs = [];

[addLevelBtn, addStaffBtn].map((btn) => {
  btn.addEventListener("click", (e) => {
    addModal(e.target.id);
  });
});

function addModal(target) {
 target === 'addLevel' ? addLevel() : addStaff();

 function addLevel() {

 }

 function addStaff() {
 
 }


}
