document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("worker_container");
    const template = document.getElementById("worker_item_template");
    const json = getWorkerJson();
    for (const workerID in json) {
        const templateClone = template.content.cloneNode(true);
        templateClone.children[0].children[1].innerHTML = json[workerID].name;
        templateClone.children[0].children[2].innerHTML = json[workerID].position;
        templateClone.children[0].href = "worker_page.html?worker=" + workerID;
        container.appendChild(templateClone);
    }
});
export function getWorkerJson() {
    const data = localStorage.getItem("workers_data");
    if (data) {
        return JSON.parse(data);
    }
    else {
        return {};
    }
}
