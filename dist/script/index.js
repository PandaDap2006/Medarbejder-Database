"use strict";
function loadWorkerList() {
    var container = document.getElementById("worker_container");
    var template = document.getElementById("worker_item_template");
    fetch("../data/workers.json").then(function (response) {
        if (!response.ok) {
            throw new Error("Network response was not ok: ".concat(response.status));
        }
        return response.json();
    }).then(function (json) {
        var _loop_1 = function (key) {
            var tempClone = template.content.cloneNode(true);
            tempClone.children[0].children[2].innerHTML = json[key]["name"];
            tempClone.children[0].children[3].innerHTML = json[key]["position"];
            tempClone.children[0].addEventListener("click", function () {
                window.location.href = "worker_page.html?worker=" + key;
            });
            container.appendChild(tempClone);
        };
        for (var key in json) {
            _loop_1(key);
        }
    }).catch(function (error) {
        console.error("Error during fetching or parsing JSON:", error);
    });
}
