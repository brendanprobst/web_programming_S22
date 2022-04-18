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
	//search form
	$("#search-form-button").on("click", function (event) {
		event.preventDefault();
		$("#show-details").empty();
		$("#show-details").hide();

		value = $("#search-input").val();
		var requestConfig = {
			method: "GET",
			url: `http://api.tvmaze.com/search/shows?q=${value}`,
		};
		if (value.trim().length === 0) {
			alert("Cannot search for nothing");
			$("#shows-list").show();
		} else {
			$("#shows-list").empty();
			$.ajax(requestConfig).then(function (res) {
				//render shows in list
				console.log(res);
				$("#shows-list").show();
				for (let show of res) {
					$("#shows-list").append(
						`<li><a class="show-link" href='${show.show._links.self.href}'>${show.show.name}</a></li>`
					);
				}
				$("a.show-link").on("click", function (event) {
					event.preventDefault();
					handleLinkClick(event.target.href);
				});
			});
		}
	});
	//link click
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
			let name,
				language,
				network,
				averageRating,
				summary = "N/A";
			let image = "/public/img/not_found.jpeg";
			if (res.name.trim() !== "" && res.name !== null) {
				name = res.name;
			}
			if (res.summary.trim() !== "" && res.summary !== null) {
				summary = res.summary;
			}
			if (res.image !== null) {
				image = res.image.medium;
			}
			if (res.language.trim() !== 0 && res.language !== null) {
				language = res.language;
			}
			if (res.genres.length === 0) {
				res.genres = ["N/A"];
			}
			if (res.rating.average) {
				averageRating = res.rating.average;
			}
			if (res.network) {
				network = res.network.name;
			}

			$("#show-details").append(/*HTML*/ `<div>
            
            <h1>${name}</h1>
            <img src="${image}" />
                        <h2>Language</h2>
                        <p>${language}</p>
                        <h2>Genres</h2>
                        <ul>
                            ${res.genres.map((genre) => `<li>${genre}</li>`)}
                        </ul>
                        <h2>Average Rating</h2>
                        <p>
                        ${averageRating}
                        </p>
                        <h2>Network</h2>
                        <p>
                        ${network}
                        </p>
                        <h2>Summary</h2>
                        <p>
                       ${summary}
                        </p>
						<a href="/">Back to home</a>
            </div>`);
		});
	}
})(window.jQuery);
