import { getWorkerJson } from "./index.js";
const textDict = {
    hours_worked: "Daglig gennemsnit af timer arbejdet",
    sodas_drank: "Daglig gennemsnit af sodavand drukket"
};
export function loadStats() {
    const urlParams = new URLSearchParams(window.location.search);
    const workerID = urlParams.get("worker");
    if (workerID) {
        const json = getWorkerJson();
        if (json) {
            const nameElem = document.getElementById("name");
            const positionElem = document.getElementById("position");
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
            tempClone.children[0].children[0].textContent = calculateAverage(stats[key]).toFixed(2).toString();
            tempClone.children[0].children[1].textContent = textDict[key];
            // const button:HTMLButtonElement = tempClone.children[0].children[0] as HTMLButtonElement;
            // button.addEventListener("click", () => {
            // });
            const input = tempClone.children[0].children[2];
            input.addEventListener("keydown", (event) => {
                if (event.key == "Enter") {
                    stats[key].push(Number.parseInt(input.value));
                    json[workerID].stats = stats;
                    localStorage.setItem("workers_data", JSON.stringify(json, null, 4));
                    location.reload();
                }
            });
            const numbers = tempClone.children[0].children[3];
            for (const numberKey in stats[key]) {
                const number = stats[key][numberKey];
                if (number) {
                    const newNumber = document.createElement("button");
                    newNumber.className = "number_button";
                    newNumber.textContent = number.toString();
                    newNumber.addEventListener("click", () => {
                        stats[key].splice(Number.parseInt(numberKey), 1);
                        json[workerID].stats = stats;
                        localStorage.setItem("workers_data", JSON.stringify(json, null, 4));
                        window.location.reload();
                    });
                    numbers.appendChild(newNumber);
                }
            }
            //(tempClone.children[0].children[0] as HTMLAnchorElement).href = "stat_page.html?worker=" + workerID + "&stat=" + key;
            container.appendChild(tempClone);
        }
    }
}
function calculateAverage(numbers) {
    let number = 0;
    if (numbers.length > 0) {
        for (const key in numbers) {
            number += numbers[key];
        }
        console.log(numbers);
        return number / numbers.length;
    }
    return 0;
}
