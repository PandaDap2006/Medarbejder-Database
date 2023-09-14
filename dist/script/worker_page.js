"use strict";
function loadWorker() {
    var urlParams = new URLSearchParams(window.location.search);
    var workerId = urlParams.get("worker");
    if (workerId) {
        fetch("../data/workers.json").then(function (response) {
            if (!response.ok) {
                throw new Error("Network response was not ok: ".concat(response.status));
            }
            return response.json();
        }).then(function (json) {
            json = json[workerId];
            var nameElem = document.getElementById("name");
            var positionElem = document.getElementById("position");
            document.title = json["name"] + " | Worker page";
            if (nameElem && positionElem) {
                nameElem.textContent = json["name"];
                positionElem.textContent = json["position"];
            }
        }).catch(function (error) {
            console.error("Error during fetching or parsing JSON:", error);
        });
    }
}
