// Storing Spotify Information in process.env
require("dotenv").config();

// Require Axios
var axios = require('axios');

// Require Bands in Town
// var bandsintown = require('bandsintown')('codingbootcamp');

// Require Inquirer
var inquirer = require('inquirer');

// Require Spotify
var Spotify = require('node-spotify-api');

// Require OMDB
var omdb = require('omdb');

// Require Moment
var moment = require('moment');

// Require fs
var fs = require('fs');

// Require keys.js
var keys = require("./keys.js");
// Access to keys
var spotify = new Spotify(keys.spotify);

// Arguments
var searchCmd = process.argv[2];
var searchTitle = process.argv.slice(3).join(' ');
// console.log('Search command:', searchCmd);
// console.log('Search title:', searchTitle);

// Spotify Information
var spotify = new Spotify({
    id: 'abfc91c429ef47f695447746ea7875a6',
    secret: '3560fa1fe4c64a6c8f62ebeececdfdf8'
});

// Determining what command to perform
if (searchCmd === undefined) {
    console.log('Please enter a search command.');
    // Concert API
} else if (searchCmd === 'concert-this') { // Bands In Town API = Complete
    var artist = searchTitle.replace(/ /g, '+');
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // console.log('queryurl:', queryURL);

    axios.get(queryURL)
        .then(function (response) {
            var event = response.data[0];
            // console.log('response1:', response.data);
            // console.log('event:', event);

            // If no results come back from search
            if (event === undefined) {
                console.log('No results were returned. Please search for a different artist.');
            } else {
                // Next Event Location: 
                console.log('');
                console.log('===============================');
                console.log(`${searchTitle}'s Next Event:`)
                console.log('Venue Name:', event.venue.name);
                console.log(`Venue Location: ${event.venue.city}, ${event.venue.region}`);
                console.log('Date of Event:', moment(event.datetime).format('L'));
                console.log('===============================');
                console.log('');
            }

        });
} else if (searchCmd === 'spotify-this-song') { // Spotify API = Complete
    if (searchTitle === '') {
        searchTitle = 'The Sign Ace of Base';
        spotifyThis(searchTitle);
    } else {
        spotifyThis(searchTitle);
    }

} else if (searchCmd === 'movie-this') { // OMDB API = Complete
    var movieTitle = searchTitle.replace(/ /g, '+');
    // console.log('movie name for url:', movieTitle);
    var queryURL = 'http://www.omdbapi.com/?t=' + movieTitle + '&y=&plot=short&apikey=trilogy';
    // console.log('queryurl:', queryURL);
    // If user enters no movie, default to Mr. Nobody results
    if (searchTitle === '' || searchTitle === undefined) {
        axios.get('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy')
            .then(function (response) {
                var movie = response.data;
                console.log('');
                console.log('===============================');
                console.log('Title:', movie.Title);
                console.log('Year:', movie.Year);
                console.log('IMDB Rating:', movie.imdbRating);
                console.log('Rotten Tomatoes Rating:', movie.Ratings[1].Value);
                console.log('Country:', movie.Country);
                console.log('Language:', movie.Language);
                console.log('Plot:', movie.Plot);
                console.log('Actors:', movie.Actors);
                console.log('===============================');
                console.log('');
            });
    } else { // Log for the movie the user entered
        axios.get(queryURL)
            .then(function (response) {
                var movie = response.data;
                if (movie.Title === undefined) {
                    console.log('That search did not turn up any results');
                } else {
                    // console.log('movie:', movie);
                    console.log('');
                    console.log('===============================');
                    console.log('Title:', movie.Title);
                    console.log('Year:', movie.Year);
                    console.log('IMDB Rating:', movie.imdbRating);
                    if (movie.Ratings.length <= 1) {
                        console.log('Rotten Tomatoes: No rating');
                    } else if (movie.Ratings.length > 1) {
                        console.log('Rotten Tomatoes:', movie.Ratings[1].Value);
                    }
                    // console.log('Rotten Tomatoes Rating:', movie.Ratings[1].Value);
                    console.log('Country:', movie.Country);
                    console.log('Language:', movie.Language);
                    console.log('Plot:', movie.Plot);
                    console.log('Actors:', movie.Actors);
                    console.log('===============================');
                    console.log('');
                }
            });
    }
} else if (searchCmd === 'do-what-it-says') { // Complete
    // Read Random.txt, split the text and store in variables
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(","); // spotify-this-song,"I Want it That Way"
        randomCmd = output[0];
        randomSong = output[1];
        spotifyThis(randomSong);
    });
};

// =====================
// FUNCTIONS
// =====================

function spotifyThis(songQuery) {
    // console.log('spotify function run');
    // Format whatever song is brought in
    var songName = songQuery.replace('+', ' ');

    spotify.search({
        type: 'track',
        query: songName,
        limit: 5
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // Shortening keystrokes with this one 
        var song = data.tracks.items[0];

        // Log the song info to the console
        console.log('');
        console.log('===============================');
        console.log('Artist(s):', song.artists[0].name);
        console.log('Song Name:', song.name);
        // Some songs may not have preview links
        if (song.preview_url === null) {
            console.log('There is no preview link for this song.');
        } else {
            console.log('Preview Link:', song.preview_url);
        }
        console.log('Album:', song.album.name);
        console.log('===============================');
        console.log('');
    });
}

function concertThis(queryURL) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artistURL + "/events?app_id=codingbootcamp";
    console.log('queryURL:', queryURL);

    axios.get(queryURL)
    .then(function(response){
        var event = response.data[0];
        console.log('event:', event);

        if (event === undefined) {
            console.log('No results');
        } else {
            console.log('');
            console.log('===============================');
            console.log(`${searchTitle}'s Next Event:`)
            console.log('Venue Name:', event.venue.name);
            console.log(`Venue Location: ${event.venue.city}, ${event.venue.region}`);
            console.log('Date of Event:', moment(event.datetime).format('L'));
            console.log('===============================');
            console.log('');
        }
    })
}