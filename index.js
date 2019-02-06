'use strict';

function getDogImage(userInput) {
  fetch(userInput)
    .then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      console.log(responseJson.status)
      if (responseJson.status == 'error') {
        $('.errorMessage').replaceWith(`<p class='errorMessage'>${responseJson.code} ${responseJson.message}</p>`);
        $('.results-img').addClass('hidden');
        $('.results-title').addClass('hidden');
        $('.results').removeClass('hidden');
      } else {
        $('.errorMessage').addClass('hidden');
        displayResults(responseJson);
      }
    })
    //.then(responseJson => 
      //displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson)
  $('.results-img').replaceWith(`<img src="${responseJson.message}" class="results-img" alt="A picture of a dog">`);
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let lowerCaseInput = document.getElementById('userInput').value.toLowerCase();
    let finalInput = `https://dog.ceo/api/breed/${lowerCaseInput}/images/random`;
    getDogImage(finalInput);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});