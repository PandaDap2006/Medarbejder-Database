import { getWorkerJson } from "./index.js";

const urlParams = new URLSearchParams(window.location.search);
const workerID = urlParams.get("worker");

if (workerID) {
	getWorkerJson().then((json) => {
		const nameElem = document.getElementById("name");
		const positionElem = document.getElementById("position");
	
		document.title = json.name + " | Worker page"
		if (nameElem && positionElem) {
			nameElem.textContent = json[workerID].name;
			positionElem.textContent = json[workerID].position;
		}
	});
}