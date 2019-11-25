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
let bandsintown = keys.bandsintown;
let omdb = keys.omdb; 

// Create an argument line from user 
userInput = process.argv[2]; 

// Create functions returning these commands: concert-this, spotify-this-song, movie-this, do-what-it-says

// This runs a request with node-spotify-api to URL with specified parameters

spotify
  .search({ type: 'track', query: userInput, limit: 1}
  , function (err, data) { 
    if (err) {
    console.error('Error occurred: ' + err); 
    } else {
    console.log(data); 
    }
  })


// Then run a request with axios to the OMDB API with the movie specified
axios.get(`http://www.omdbapi.com/?t=${userInput}&y=&plot=short&apikey=${omdb}`)
.then(function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
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

