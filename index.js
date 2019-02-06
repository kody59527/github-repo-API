'use strict';

function getRepos(userInput) {
  fetch(userInput)
    .then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      console.log(responseJson.status)
      if (responseJson.status == 'error') {
        $('.errorMessage').replaceWith(`<p class='errorMessage'>${responseJson.code} ${responseJson.message}</p>`);
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
  $('.results-repo').replaceWith(`<p>${responseJson.value}</p>`);
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let userInput = document.getElementById('userInput').value;
    let finalInput = `https://api.github.com/users/${userInput}/repos`; 
    getRepos(finalInput);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});