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

// Ex Input
// node liri.js spotify-this-song '<song name here>'

// Artist
// Song Name
// Preview Link of Song from Spotify
// The album that the song is from

// Spotify Request
spotify.











// OMDB Function if the choice is to search a movie
function searchOMDB(url) { 
  // Take in the URL and console log Movie Info
  request(url,function(err, response) {
    if (!error && response.statusCode === 200) {
    // Log movie info
    console.log(`=======================================`);
    console.log(`Title: ${response.data.Title}`);
    console.log(`IMDB Rating: ${response.data.imdbRating}`);
    console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
    console.log(`Country: ${response.data.Country}`);
    console.log(`Language: ${response.data.Language}`);
    console.log(`Plot: ${response.data.Plot}`);
    console.log(`Actors: ${response.data.Actors}`);
    console.log(`=======================================`);
    }
  })
}




// Axios Request
var axios = require('axios');


