var romComs = ["The Notebook", "My Best Friend's Wedding", "A Walk To Remember", "Clueless", "The Wedding Planner", "The Wedding Singer", "Pretty Woman", "Legally Blonde", "Never Been Kissed", "You've Got Mail", "50 First Dates", "The Sweetest Thing", "10 Things I Hate About You", "Fools Rush In"];
var staticURL = [];
var animatedURL = [];

function render() {

	// Emptys the button area then makes a new button for each item in the array.
	$("#buttonArea").empty();
	for (var i = 0; i < romComs.length; i++) {
		var newButton = $("<button>");
		newButton.text(romComs[i]);
		newButton.attr("data-name", romComs[i]);
		newButton.addClass("movie");
		$("#buttonArea").append(newButton);
	};

	// When you click a tvshow button...
	$(".movie").click(function() {

		// Emptys the arrays
		animatedURL = [];
		staticURL = [];

		// Emptys the area the gifs go in. 
		$("#gifArea").empty();

		// Plugs the name of the show into the url that will be used with the API
		var x = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";

		
		$.ajax({url: queryURL, method: 'GET'}).done(function(gif) {

			// Logging stuff to the console for debugging
			console.log(gif);
			console.log(queryURL);

			// Creates the divs and images and appends them to the page..
			for (var i = 0; i < 10; i++) {

				animatedURL.push(gif.data[i].images.fixed_height.url);
				staticURL.push(gif.data[i].images.fixed_height_still.url);

				var newDiv = $("<div>");
				newDiv.addClass("gifDiv")

				var p = $("<p>");
				p.text("Rating: "+ gif.data[i].rating)
                p.addClass("rating")
                 
				if (gif.data[i].rating == "") {
					p.text("n/a")
				};

				var newGif = $("<img>");

				newGif.attr("data-number", i)
				newGif.attr("src", gif.data[i].images.fixed_height_still.url);

				newDiv.append(p);
				newDiv.append(newGif);

				$("#gifArea").append(newDiv);

				// This function creates the play/pause action
				newGif.click(function() {
					if ( $(this).attr("src") == staticURL[$(this).attr("data-number")] ) {
						$(this).attr("src", animatedURL[$(this).attr("data-number")])
					} else {
						$(this).attr("src", staticURL[$(this).attr("data-number")]);
					};
				});

			};

		});

	});

};

// Putting the initial buttons on the page.
render();

// The function that adds a tvshow button to the button area on click.
$("#addMovie").click(function() {
	var addedButton = $("#inputBox").val();
	$("#inputBox").val(null);
	romComs.push(addedButton);
	render();
});
