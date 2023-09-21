document.addEventListener("DOMContentLoaded", () => {
	const container:HTMLElement = document.getElementById("worker_container") as HTMLElement;
	const template:HTMLTemplateElement = document.getElementById("worker_item_template") as HTMLTemplateElement;

	const json = getWorkerJson();
	for (const workerID in json) {
		const templateClone:HTMLTemplateElement = template.content.cloneNode(true) as HTMLTemplateElement;
		templateClone.children[0].children[1].innerHTML = json[workerID].name;
		templateClone.children[0].children[2].innerHTML = json[workerID].position;
		(templateClone.children[0] as HTMLAnchorElement).href = "worker_page.html?worker=" + workerID;
		container.appendChild(templateClone);
	}
});

export interface WorkerData {
	name: string;
	position: string;
	stats: { [key: string]: number[] };
}

export function getWorkerJson(): { [key: string]: WorkerData } {
	const data = localStorage.getItem("workers_data");
	if (data) {
		return JSON.parse(data);
	} else {
		return {};
	}
}