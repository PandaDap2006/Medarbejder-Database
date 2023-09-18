export function loadWorkers() {
    const container = document.getElementById("worker_container");
    const template = document.getElementById("worker_item_template");
    const json = getWorkerJson();
    for (const key in json) {
        const tempClone = template.content.cloneNode(true);
        tempClone.children[0].children[2].innerHTML = json[key].name;
        tempClone.children[0].children[3].innerHTML = json[key].position;
        tempClone.children[0].href = "worker_page.html?worker=" + key;
        container.appendChild(tempClone);
    }
    console.log(json);
}
export function getWorkerJson() {
    const data = localStorage.getItem("workers_data");
    if (data) {
        return JSON.parse(data);
    }
    else {
        return {};
    }
}
