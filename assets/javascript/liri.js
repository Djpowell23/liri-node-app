// Require File System
var fs = require('fs');

// Require dotenv
require("dotenv").config();
// Require keys
var keys = require("./keys.js");
// OMDB Request
var request = require('request');
// Spotify Request
var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);
// Inquirer Input Package
var inquirer = require("inquirer");
 
var spotify = new Spotify({
  id: 'abfc91c429ef47f695447746ea7875a6',
  secret: '3560fa1fe4c64a6c8f62ebeececdfdf8'
});

// Ex Input
// node liri.js spotify-this-song '<song name here>'
var songCmd = process.argv[2];
var song = process.argv[3];

// Artist
// Song Name
// Preview Link of Song from Spotify
// The album that the song is from

// Axios Request
var axios = require('axios');

// Axios Request for omdb
axios.get('http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy')
.then(
  function(response) {
    console.log(`Title: ${response.data.Title}`);
    console.log(`IMDB Rating: ${response.data.imdbRating}`);
    console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
    console.log(`Country: ${response.data.Country}`);
    console.log(`Language: ${response.data.Language}`);
    console.log(`Plot: ${response.data.Plot}`);
    console.log(`Actors: ${response.data.Actors}`);
  }
);
