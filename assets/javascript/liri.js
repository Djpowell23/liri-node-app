// Require dotenv
require("dotenv").config();
// Require File System
var fs = require('fs');
// Axios Request
var axios = require('axios');
// Require keys
var keys = require("./keys.js");
// OMDB Request
var request = require('request');
// Spotify Request
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// Inquirer Input Package
var inquirer = require("inquirer");
 
var spotify = new Spotify({
  id: 'abfc91c429ef47f695447746ea7875a6',
  secret: '3560fa1fe4c64a6c8f62ebeececdfdf8'
});


// OMDB Function if the choice is to search a movie
function searchOMDB(queryURL) { 
  // Take in the URL and console log Movie Info
  request(queryURL,function(err, response, body) {
    console.log('response:', JSON.parse(body));
    if (!err && response.statusCode === 200) {
    // Log movie info
    console.log(`=======================================`);
    console.log('Title:', JSON.parse(body).Title);
    console.log('IMDB Rating:', JSON.parse(body).imdbRating);
    console.log('Rotten Tomatoes:', JSON.parse(body).Ratings[1].Value);
    console.log('Country:', JSON.parse(body).Country);
    console.log('Language:', JSON.parse(body).Language);
    console.log('Plot:', JSON.parse(body).Plot);
    console.log('Actors:', JSON.parse(body).Actors);
    console.log(`=======================================`);
    }
  });
}


// Inquirer Flow
inquirer.prompt([
  {
    type: 'list',
    name: 'userInput',
    message: 'Hello. What can I do for you today?',
    choices: ['Find Movie','Find Song','Obedience is my purpose...']
  }
]).then(function(command) {
  // console.log('User Command', command); // Comes back as an object called userInput

  // If User wants to find a movie
  if (command.userInput === 'Find Movie') {
    console.log('User Command:', command);

    // Ask which movie to search for
    inquirer.prompt([
      {
        type: 'input',
        name:'movieTitle',
        message: 'Which movie would you like information on?',
      }
    ]).then(function(movie) {
      // console.log('Movie Title:', movie); // Comes back as object called movieTitle

      // If movie field is empty
      if (movie.movieTitle === '') {
        var queryURL='http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy'
        // If the user entered a movie name
      } else {
        // Build the queryURL
        var movieTitle = movie.movieTitle.replace(/ /g,'+');
        var queryURL = 'http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&apikey=trilogy';
        // console.log('queryURL:', queryURL); // Works correctly now
      }
      searchOMDB(queryURL);
    })
  }







  // If User wants to find a song
  // If User wants Liri to do what she's told
})
























// Ex Input
// node liri.js spotify-this-song '<song name here>'

// Artist
// Song Name
// Preview Link of Song from Spotify
// The album that the song is from

// Spotify Request














