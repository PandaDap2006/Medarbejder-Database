import { getWorkerJson } from "./index.js";

const textDict = {
	hours_worked: "Daglig gennemsnit af timer arbejdet",
	sodas_drank: "Daglig gennemsnit af sodavand drukket"
};

document.addEventListener("DOMContentLoaded", () => {
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

		const container:HTMLElement = document.getElementById("stats_container") as HTMLElement;
		const template:HTMLTemplateElement = document.getElementById("stat_template") as HTMLTemplateElement;

		const stats = json[workerID].stats as { [key: string]: number[] };
		for (const key in stats) {
			const tempClone:HTMLTemplateElement = template.content.cloneNode(true) as HTMLTemplateElement;
			tempClone.children[0].children[0].textContent = calculateAverage([]).toString();
			tempClone.children[0].children[1].textContent = textDict[key as keyof typeof textDict];
			container.appendChild(tempClone);
		}
	}
});

function calculateAverage(numbers: number[]): number {
	let number = 0;
	if (numbers.length > 0) {
		numbers.forEach((newNumber) => {
			number += newNumber;
		})
		return number/numbers.length;
	}
	return 0;
}