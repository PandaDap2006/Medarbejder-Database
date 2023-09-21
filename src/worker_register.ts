import { getWorkerJson } from "./index.js";

const add_worker_btn = document.getElementById("add_worker_btn") as HTMLButtonElement;
add_worker_btn.addEventListener("click", function() {
	registerWorker();
});

let json = getWorkerJson();

const urlParams = new URLSearchParams(window.location.search);
let workerID = urlParams.get("worker");

const nameInput:HTMLInputElement = document.getElementById("name_input") as HTMLInputElement;
const positionInput:HTMLInputElement = document.getElementById("position_input") as HTMLInputElement;
const profileIMGInput:HTMLInputElement = document.getElementById("profile_img") as HTMLInputElement;

const delete_btn = document.getElementById("delete_btn") as HTMLButtonElement;

if (workerID) {
	nameInput.value = json[workerID].name;
	positionInput.value = json[workerID].position;

	add_worker_btn.textContent = "Rediger Medarbejder"

	delete_btn.addEventListener("click", function() {
		delete json[workerID as string];
		localStorage.setItem("workers_data", JSON.stringify(json, null, 4))

		window.location.href = "index.html";
	});
} else {
	delete_btn.remove()
}

function registerWorker() {
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
		localStorage.setItem("workers_data", JSON.stringify(json, null, 4))
		window.location.href = "worker_page.html?worker=" + workerID;
	} else {
		console.error("All inputs need to be filled");
	}
}