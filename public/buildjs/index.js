export function loadWorkers() {
    const container = document.getElementById("worker_container");
    const template = document.getElementById("worker_item_template");
    getWorkerJson().then((json) => {
        for (const key in json) {
            const tempClone = template.content.cloneNode(true);
            tempClone.children[0].children[2].innerHTML = json[key].name;
            tempClone.children[0].children[3].innerHTML = json[key].position;
            tempClone.children[0].addEventListener("click", function () {
                window.location.href = "worker_page.html?worker=" + key;
            });
            container.appendChild(tempClone);
        }
        console.log(json);
    });
}
export function getWorkerJson() {
    return fetch("../data/workers.json").then((response) => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    }).catch((error) => {
        console.error("Error during fetching or parsing JSON:", error);
    });
}
