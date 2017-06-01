$(function() {

var link = "https://www.googleapis.com/youtube/v3/search"

var template = (
	'<div>' +
    '<a class="js-result-name" href="" target="_blank"></a>' + 
    '<img class="thumbnail">' +
  	'</div>'
	);

function watchSubmit() {
	$('.search-youtube-form').submit(function(event) {
		event.preventDefault();
		var searchInput = $(event.currentTarget).find('.search-input');
		var searchInputValue = searchInput.val();
		searchInput.val("");
		getDataFromApi(searchInputValue, displayYoutubeSearchData);
	})
}

function getDataFromApi(searchTerm, callback) {
	var settings = {
	url: link,
    data: {
      q: searchTerm + " in:name",
      per_page: 5,
      part: 'snippet',
      key: "AIzaSyCYbiK3iDzAOVIUceNPWMP328adQHESMX4"
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  	}; 
  	$.ajax(settings);
}

function displayYoutubeSearchData(data) {
	var results = data.items.map(function(item, index){
			return renderResults(result);
	});
$('.results').append(results)
}

function renderResults(result) {
	var template = $(template);
  template.find(".js-result-name").text(result.snippet.title);
  template.find(".thumbnail").attr("href", "https://www.youtube.com/" + result.id.videoID);
  return template;
}

});