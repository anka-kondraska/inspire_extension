"use strict";


function getSearchTerm(callback) {
  var searchTerm = document.getElementById('searchTerm').value;
  console.assert(typeof searchTerm == 'string', 'searchTerm should be a string');
  console.log(searchTerm);
  callback(searchTerm);
}

function getQuote(searchString, callback, errorCallback) {
  // var url = "https://api.twitter.com/1.1/search/tweets.json?q="
  //            + encodeURIComponent(searchString)
  //            + "%20from%3Arealdonaldtrump&result_type=popular"
  // console.log(url);
  var url = 'https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q='
            + encodeURIComponent(searchString);
  // var url = 'http://abouttrump.org/?s=donaldism+loser&order=DESC&db_posts_per_page=1'

if (searchString==='') {
  url = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random'
}
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.onreadystatechange = function() {
                  if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                      callback(xmlHttp.responseText);
              }
              xmlHttp.open("GET", url, true); // true for asynchronous
              // xmlHttp.responseType = 'json';
              xmlHttp.withCredentials = false;

              xmlHttp.onerror = function() {
                errorCallback('Network error.');
              };
              xmlHttp.send(null);
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  var makeGreatButton = document.getElementById('makeGreat');

  makeGreatButton.addEventListener('click', function() {
    getSearchTerm( function(term) {
      getQuote(term, function(response) {
        var imageResult = document.getElementById('image-result');
        var re = /([^"]*?)(?=\")/g;
        var message = response.match(re);
        // debugger;
        // var responseSplit = response.split(',')[0];
        // var message = responseSplit.split(':')[1];
        imageResult.innerHTML = message[6]
        console.log(response);

      });
    });


  }, false);
  }, false);
