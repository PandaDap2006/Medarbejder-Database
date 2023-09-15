import { getWorkerJson } from "./index";
import * as fs from "fs";
function registerWorker() {
    const nameInput = document.getElementById("name_input");
    const positionInput = document.getElementById("position_input");
    const workerID = nameInput.value.replace(" ", "_");
    getWorkerJson().then((json) => {
        json[workerID] = {
            "name": nameInput.value,
            "position": positionInput.value
        };
        fs.writeFileSync("../data/workers.json", JSON.stringify(json, null, 4), "utf-8");
    });
    window.location.href = "worker_page.html?worker=" + workerID;
}
