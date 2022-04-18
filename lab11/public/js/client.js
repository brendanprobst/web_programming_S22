(function ($) {
	//function to do all the stuff

	var requestConfig = {
		method: "GET",
		url: "http://api.tvmaze.com/shows",
	};
	$("#shows-list").empty();
	$("#shows-list").hide();

	$.ajax(requestConfig).then(function (res) {
		$("#shows-list").show();
		for (let show of res) {
			$("#shows-list").append(
				`<li><a class="show-link" href='${show._links.self.href}'>${show.name}</a></li>`
			);
		}
		$("a.show-link").on("click", function (event) {
			event.preventDefault();
			handleLinkClick(event.target.href);
		});
	});
	function handleLinkClick(link) {
		let showId = link.substring(link.lastIndexOf("/") + 1, link.length);
		var requestConfig = {
			method: "GET",
			url: `http://api.tvmaze.com/shows/${showId}`,
		};
		$.ajax(requestConfig).then(function (res) {
			$("#shows-list").empty();
			$("#shows-list").hide();
			$("#show-details").empty();
			$("#show-details").show();
			if (res.name.trim() === "" || res.name === null) {
				res.name = "N/A";
			}
			if (res.image.medium === null) {
				console.log("image not found");
				res.image = "/public/img/not_found.jpeg";
			}
			if (res.language.trim() === 0) {
				res.language = "N/A";
			}
			if (res.genres.length !== 0) {
				res.genres = ["N/A"];
			}
			if (!res.rating.average) {
				res.rating.average = "N/A";
			}
			if (!res.network) {
				res.network.name = "N/A";
			}

			$("#show-details").append(/*HTML*/ `<div>
            
            <h1>${res.name}</h1>
            <img src="${
							res.image && res.image.medium
								? res.image.medium
								: "/public/img/not_found.jpeg"
						}" />
                        <h2>Language</h2>
                        <p>${res.language}</p>
                        <h2>Genres</h2>
                        <ul>
                            ${res.genres.map((genre) => `<li>${genre}</li>`)}
                        </ul>
                        <h2>Average Rating</h2>
                        <p>
                        ${res.rating.average}
                        </p>
                        <h2>Network</h2>
                        <p>
                        ${res.network.name}
                        </p>
                        <h2>Summary</h2>
                        <p>
                       ${res.summary}
                        </p>
            </div>`);
		});
	}
	$("#search-form").submit(function (event) {
		event.preventDefault();
		console.log($("#search-input".val()));
	});
})(window.jQuery);
