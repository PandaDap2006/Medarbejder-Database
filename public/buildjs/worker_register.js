import { getWorkerJson } from "./index.js";
const add_worker_btn = document.getElementById("add_worker_btn");
add_worker_btn.addEventListener("click", function () {
    registerWorker();
});
let json = getWorkerJson();
const urlParams = new URLSearchParams(window.location.search);
let workerID = urlParams.get("worker");
const nameInput = document.getElementById("name_input");
const positionInput = document.getElementById("position_input");
const profileIMGInput = document.getElementById("profile_img");
const delete_btn = document.getElementById("delete_btn");
if (workerID) {
    nameInput.value = json[workerID].name;
    positionInput.value = json[workerID].position;
    add_worker_btn.textContent = "Rediger Medarbejder";
    delete_btn.addEventListener("click", function () {
        delete json[workerID];
        localStorage.setItem("workers_data", JSON.stringify(json, null, 4));
        window.location.href = "index.html";
    });
}
else {
    delete_btn.remove();
}
function registerWorker() {
    if (nameInput.value && positionInput.value) {
        if (!workerID) {
            workerID = nameInput.value.replace(" ", "_").toLowerCase();
        }
    if (nameInput.value && positionInput.value) {
        if (!workerID) {
            workerID = nameInput.value.replace(" ", "_").toLowerCase();
        }
        json[workerID] = {
            "name": nameInput.value,
            "position": positionInput.value,
            "stats": {
                "hours_worked": [],
                "sodas_drank": [],
            }
        };
        console.log(json[workerID]);
        localStorage.setItem("workers_data", JSON.stringify(json, null, 4));
        window.location.href = "worker_page.html?worker=" + workerID;
    }
    else {
        console.error("All inputs need to be filled");
    }
}
