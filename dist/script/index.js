"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadWorkerList() {
    var container = document.getElementById("worker_container");
    var template = document.getElementById("worker_item_template");
    fetch("../data/workers.json").then(function (response) {
        if (!response.ok) {
            throw new Error("Network response was not ok: ".concat(response.status));
        }
        return response.json();
    }).then(function (json) {
        for (var key in json) {
            var tempClone = template.content.cloneNode(true);
            tempClone.children[0].children[2].innerHTML = json[key]["name"];
            tempClone.children[0].children[3].innerHTML = json[key]["position"];
            container.appendChild(tempClone);
        }
    }).catch(function (error) {
        console.error("Error during fetching or parsing JSON:", error);
    });
}
