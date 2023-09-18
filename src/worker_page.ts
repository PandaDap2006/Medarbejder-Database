import { getWorkerJson } from "./index.js";

const urlParams = new URLSearchParams(window.location.search);
const workerID = urlParams.get("worker");

if (workerID) {
	const json = getWorkerJson();
	if (json) {
		const nameElem = document.getElementById("name");
		const positionElem = document.getElementById("position");
	
		document.title = json[workerID].name + " | Worker page"
		if (nameElem && positionElem) {
			nameElem.textContent = json[workerID].name;
			positionElem.textContent = json[workerID].position;
		}
	}
	
	(document.getElementById("edit_btn") as HTMLAnchorElement).href = "worker_register.html?worker=" + workerID;
}