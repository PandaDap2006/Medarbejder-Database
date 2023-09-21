import { getWorkerJson } from "./index.js";
const urlParams = new URLSearchParams(window.location.search);
const workerID = urlParams.get("worker");
const textDict = {
    hours_worked: "Daglig gennemsnit af timer arbejdet",
    sodas_drank: "Daglig gennemsnit af sodavand drukket"
};
if (workerID) {
    const json = getWorkerJson();
    if (json) {
    const json = getWorkerJson();
    if (json) {
        const nameElem = document.getElementById("name");
        const positionElem = document.getElementById("position");
        document.title = json[workerID].name + " | Worker page";
        document.title = json[workerID].name + " | Worker page";
        if (nameElem && positionElem) {
            nameElem.textContent = json[workerID].name;
            positionElem.textContent = json[workerID].position;
        }
    }
    document.getElementById("edit_btn").href = "worker_register.html?worker=" + workerID;
    const container = document.getElementById("stats_container");
    const template = document.getElementById("stat_template");
    const stats = json[workerID].stats;
    for (const key in stats) {
        const tempClone = template.content.cloneNode(true);
        tempClone.children[0].children[0].textContent = calculateAverage([]).toString();
        tempClone.children[0].children[1].textContent = textDict[key];
        container.appendChild(tempClone);
    }
}
function calculateAverage(numbers) {
    let number = 0;
    if (numbers.length > 0) {
        numbers.forEach((newNumber) => {
            number += newNumber;
        });
        return number / numbers.length;
    }
    return 0;
}
