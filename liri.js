// This is a command line Node application that utilizes APIs for Spotify, Bands in Town, and OMDB

// Load the NPM packages dotenv, inquirer, axios, request, spotify, moment  
require('dotenv').config();
const inquirer = require('inquirer');
const axios = require('axios'); 
const moment = require('moment');
let Spotify = require('node-spotify-api');

// Set the API id/key from keys.js as variables
let keys = require("./keys.js"); 
let spotify = new Spotify(keys.spotify);
let bandsintown = keys.bandsintown.id;
let omdb = keys.omdb.key; 

// Create an argument line from user 
let command = process.argv[2]; 
let userSearch = process.argv[3];

// Create function returning these commands: concert-this, spotify-this-song, movie-this, do-what-it-says
function action(command) { 
    // Apply a switch-case to apply the input to a command
    switch(command) { 
        case "spotify-this-song":
        spotifyThis();
        break;
        
        case "concert-this": 
        concertThis();
        break;

        case "movie-this": 
        movieThis(); 
        break; 

        case "do-what-it-says":
        break; 
        
        default:
        console.log("Please try again with a different input.")
    }
}
action(command);

// Write a Spotify function to apply in a switch-case 
function spotifyThis() { 

// This runs a request with node-spotify-api to URL with specified parameters
spotify
  .search({ type: 'track', query: userSearch, limit: 1}
  , function (err, data) { 
    if (err) {
    console.error('Error occurred: ' + err); 
    } else {
    let spotifyResult = data.tracks.items; 
   
    }
  });
}

// Write a OMDB function to apply in a switch-case 
function movieThis() {

// Then run a request with axios to the OMDB API with the movie specified
axios.get(`http://www.omdbapi.com/?t=${userSearch}&y=&plot=short&apikey=${omdb}`)

  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
} 

// Write a Bands in Town function to apply in a switch-case
function concertThis() { 
// Then run a request with axios to the Bands in Town API with the artist specified
axios.get(`https://rest.bandsintown.com/artists/${userSearch}/events?app_id=${bandsintown}`)
.then(function(response) {
    bandChoice = response.data;
   
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
} 