function loadWorker() {
	const urlParams = new URLSearchParams(window.location.search);
	const workerId = urlParams.get("worker");

	if (workerId) {
		fetch("../data/workers.json").then((response) => {
			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.status}`);
			}
			return response.json();
		}).then((json) => {
			json = json[workerId];
			const nameElem = document.getElementById("name");
			const positionElem = document.getElementById("position");

			if (nameElem && positionElem) {
				nameElem.textContent = json["name"];
				positionElem.textContent = json["position"];
			}
		}).catch((error) => {
			console.error("Error during fetching or parsing JSON:", error);
		});
	}
}