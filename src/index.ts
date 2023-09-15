export function loadWorkers() {
	const container:HTMLElement = document.getElementById("worker_container") as HTMLElement;
	const template:HTMLTemplateElement = document.getElementById("worker_item_template") as HTMLTemplateElement;

	getWorkerJson().then((json) => {
		for (const key in json) {
			const tempClone:HTMLTemplateElement = template.content.cloneNode(true) as HTMLTemplateElement;
			tempClone.children[0].children[2].innerHTML = json[key].name;
			tempClone.children[0].children[3].innerHTML = json[key].position;
			tempClone.children[0].addEventListener("click", function() {
				window.location.href = "worker_page.html?worker=" + key;
			});
			container.appendChild(tempClone);
		}
		console.log(json);
	});
}

export interface workerData {
	name: string;
	position: string;
}

export function getWorkerJson(): Promise<{ [key: string]: workerData }> {
	return fetch("../data/workers.json").then((response) => {
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.status}`);
		}
		return response.json()
	}).catch((error) => {
		console.error("Error during fetching or parsing JSON:", error);
	});
}