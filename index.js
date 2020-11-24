'use strict'

const apiKey = 'BhKmBMMbebzXlSwhzwxV3RzY5FQJOllxPgK1W33R'
const searchURL = `https://developer.nps.gov/api/v1/parks?limit=100&api_`

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    // if there are previous results, remove them
    const maxResults = $('#js-max-results').val()
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++){
      $('#results-list').append(
        `<li><h3>${responseJson.data[i].fullName}, ${responseJson.data[i].states}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a><br>
        <img class='img' src='${responseJson.data[i].images[0].url}'>
        </li>`
      )};
    //display the results section  
    $('#results').removeClass('hidden');
  }

  function getYouTubeVideos(query, maxResults=10) {
    const params = {
      key: apiKey,
      stateCode: query,
      maxResults,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + queryString;
  
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-state').val();
      const maxResults = $('#js-max-results').val();
      getYouTubeVideos(searchTerm, maxResults);
    });
  }
  
  $(watchForm)