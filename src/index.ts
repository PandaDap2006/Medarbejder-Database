export function loadWorkers() {
	const container:HTMLElement = document.getElementById("worker_container") as HTMLElement;
	const template:HTMLTemplateElement = document.getElementById("worker_item_template") as HTMLTemplateElement;

	const json = getWorkerJson();
	for (const key in json) {
		const tempClone:HTMLTemplateElement = template.content.cloneNode(true) as HTMLTemplateElement;
		tempClone.children[0].children[2].innerHTML = json[key].name;
		tempClone.children[0].children[3].innerHTML = json[key].position;
		(tempClone.children[0] as HTMLAnchorElement).href = "worker_page.html?worker=" + key;
		container.appendChild(tempClone);
	}
}

export interface workerData {
	name: string;
	position: string;
	stats: workerStats;
}

export interface workerStats {
	hours_worked: number[];
	sodas_drank: number[];
}

export function getWorkerJson(): { [key: string]: workerData } {
	const data = localStorage.getItem("workers_data");
	if (data) {
		return JSON.parse(data);
	} else {
		return {};
	}
}