chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	if (request.msg === "button_clicked") {
		var artistsList = document.querySelectorAll('div.audio_row__performers');
		var titlesList = document.querySelectorAll('span._audio_row__title_inner');
		var artists = [];
		var songs = [];
		var music = [];
		//create array for artists and songs
		for (var i = 0; i < artistsList.length; i++) {
			artists.push(artistsList[i].innerText);
		}
		for (var i = 0; i < titlesList.length; i++) {
			songs.push(titlesList[i].innerText);
		}
		for (var i = 0; i < artists.length; i++) {
			music.push(artists[i] + " - " + songs[i]);
		}
		// check is total equal		
		console.log("total artists: " + artists.length);
		console.log("total songs: " + songs.length);
		//create window func
		createWindow(music, request.num, request.alph);
	}
});
$(window).scroll(function() {
	if($(window).scrollTop() + $(window).height() == $(document).height()) {
		chrome.runtime.sendMessage({
			msg: "scroll_completed"
		});
	}
});
function createWindow(music, boolNum, boolAlph) {
	var opened = window.open("");
	opened.document.write("<html><head><title>your music list</title></head><body>");
	if (boolAlph === true) {
		music.sort();
	}
	for (var i = 0; i < music.length; i++) {
		if (boolNum === true ) {
			opened.document.write("<span>" + (i+1) + ". " + music[i] + "</span><br>")
		} else {
			opened.document.write("<span>" + music[i] + "</span><br>")
		}
	}
	opened.document.write("</body></html>");
	console.log("music list created");
}





 
    