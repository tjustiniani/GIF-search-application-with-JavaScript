var romComs = ["The Notebook", "My Best Friend's Wedding", "A Walk To Remember", "Clueless", "The Wedding Planner", "The Wedding Singer", "Pretty Woman", "Legally Blonde", "Never Been Kissed", "You've Got Mail", "50 First Dates", "The Sweetest Thing", "10 Things I Hate About You", "Fools Rush In", "13 Going On 30"];
var staticURL = [];
var animatedURL = [];

function render() {

	
	$("#buttonArea").empty();
	for (var i = 0; i < romComs.length; i++) {
		var newButton = $("<button>");
		newButton.text(romComs[i]);
		newButton.attr("data-name", romComs[i]);
		newButton.addClass("movie");
		$("#buttonArea").append(newButton);
	};


	$(".movie").click(function() {

		
		animatedURL = [];
		staticURL = [];

		
		$("#gifArea").empty();

		var x = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";

		
		$.ajax({url: queryURL, method: 'GET'}).done(function(gif) {

			console.log(gif);
			console.log(queryURL);

		
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

render();

$("#addMovie").click(function() {
	var addedButton = $("#inputBox").val();
	$("#inputBox").val(null);
	romComs.push(addedButton);
	render();
});
