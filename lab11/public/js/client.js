(function ($) {
	//function to do all the stuff

	function renderShows() {
		var shows;
		var showContainer = document.querySelector("#shows-list");
		var requestConfig = {
			method: "GET",
			url: "http://api.tvmaze.com/shows",
		};
		$.ajax(requestConfig).then(function (res) {
			shows = res;
			for (let show of shows) {
				let showEl = createShowListElement(show);
				showContainer.appendChild(showEl);
			}
		});

		return shows;
	}
	function getShowDetails(id) {
		console.log("in here");
		console.log(object);
		console.log(id);
		alert("wow");
		return id;
	}
	function createShowListElement(show) {
		let li = document.createElement("li");
		let link = document.createElement("a");
		link.innerHTML = show.name;
		link.href = show._links.self.href;
		console.log("here");
		link.click(function (event) {
			console.log("here");
			event.preventDefault();
			getShowDetails(e, show.id);
		});
		console.log("now here");
		li.appendChild(link);
		return li;
	}

	renderShows();
})(window.jQuery);
