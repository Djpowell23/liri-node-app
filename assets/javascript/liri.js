require("dotenv").config();
var keys = require("./keys.js");

// Key
// abfc91c429ef47f695447746ea7875a6
// Require Spotify Node package
var Spotify = require('node-spotify-api');
 
// 
var spotify = new Spotify({
  id: abfc91c429ef47f695447746ea7875a6,
//   secret: <your spotify client secret>
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
});