var boolNum = false; 
var boolAlph = false;

$("#faq").on("click", function() {
	$(".info").toggleClass("info_active");
});

$(".numCheck").on("click", function() {
	$(this).toggleClass("numCheck_active");
	boolNum = !boolNum;
});
$(".alphCheck").on("click", function() {
	$(this).toggleClass("alphCheck_active");
	boolAlph = !boolAlph;
});

$("#startButton").on('click', function () {
	var text = 0;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			msg: "button_clicked",
			num: boolNum,
			alph: boolAlph
		});
	});
});

chrome.tabs.getSelected(null, function(tab) {
	var tabLink = tab.url;
	if (/^https:\/\/vk\.com\/audios/.test(tabLink)) {
		$(".pageCheck").attr("class", "pageCheck_active");
		//alert("correct page");
	}
});
chrome.runtime.onMessage.addListener(
	function(request) {
		if (request.msg === "scroll_completed") {
			$(".scrollCheck").attr("class", "scrollCheck_active");
		}
	}
);


//document.addEventListener('DOMContentLoaded', function() {});