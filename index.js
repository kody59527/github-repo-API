'use strict';

function getRepos(userInput, options) {
  fetch(userInput, options)
    .then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      console.log(responseJson)
      if (responseJson.message === 'Not Found') {
        $('.results-repo').empty();
        $('.errorMessage').replaceWith(`<p class='errorMessage'>${responseJson.message}. Please try again.</p>`);
        $('.results-title').addClass('hidden');
        $('.results').removeClass('hidden');
      } else {
        $('.errorMessage').addClass('hidden');
        displayResults(responseJson);
      }
    })
    .catch(error => alert('Something went wrong. Please try again later.'));
}

function displayResults(responseJson) {
  $('.results-repo').empty();
  $('.results-title').removeClass('hidden');
  for (let i = 0; i < responseJson.length; i++) {
    $('.results-repo').append(`<p>Repo Name: ${responseJson[i].name} <a href="${responseJson[i].url}">Link</a></p>`);
  }
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