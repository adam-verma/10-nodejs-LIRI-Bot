// This is a command line Node application that utilizes APIs for Spotify, Bands in Town, and OMDB

// Load the NPM packages dotenv, inquirer, axios, request, spotify, moment  
require('dotenv').config();
const fs = require('fs')
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
function action(command,userSearch) { 
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
        doWhatItSays(command, userSearch);
        break; 

        default:
        console.log("Please try again with a different input.")
    }
}
action(command,userSearch);

// Write a Spotify function to apply in a switch-case 
function spotifyThis() { 
// If there is nothing assigned to userSearch then it defaults to "The Sign - Ace of Base"
if (!userSearch) {
  userSearch = 'The Sign - Ace of Base'
}

// This runs a request with node-spotify-api to URL with specified parameters
spotify
  .search({ type: 'track', query: userSearch, limit: 1}
  , function (err, data) { 
    if (err) {
    console.error('Error occurred: ' + err); 
    } else {
    let spotifyResult = data.tracks.items; 
    for (let i=0; i< spotifyResult.length; i++) {
      console.log(`\nHere is the track we found: \nArtist: ${spotifyResult[i].album.artists[0].name} \nSong Name: ${spotifyResult[i].name} \nPreview on Spotify: ${spotifyResult[i].album.external_urls.spotify} \nAlbum Name: ${spotifyResult[i].album.name}`)
    }    
    }
  });
}

// Write a OMDB function to apply in a switch-case 
function movieThis() {
// If there is nothing assigned to userSearch then it defaults to "Mr. Nobody"
if (!userSearch) {
    userSearch = "Mr. Nobody"
  }

// Then run a request with axios to the OMDB API with the movie specified
axios.get(`http://www.omdbapi.com/?t=${userSearch}&y=&plot=short&apikey=${omdb}`)
  .then(function(response) {
    movieChoice = JSON.parse(response.data);
    console.log(`\nMovie Title: ${movieChoice.Title} \nRelease Year: ${movieChoice.Year} \nIMDB Rating: ${movieChoice.imdbRating} \n${movieChoice.Ratings[1].Source}' Rating: ${movieChoice.Ratings[1].Value} \nProducing Countr(ies)y: ${movieChoice.Country} \nMovie Language(s): ${movieChoice.Language} \nMovie Plot: ${movieChoice.Plot} \nMovie Actors: ${movieChoice.Actors} \n \n ------------ End of Search ---------- `)
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

// Write a Bands in Town function to apply in a switch-case
function concertThis() { 

// Then run a request with axios to the Bands in Town API with the artist specified
axios.get(`https://rest.bandsintown.com/artists/${userSearch}/events?app_id=${bandsintown}`)
.then(function(response) {
    bandChoice = response.data;
    if (response.status === 200) {
      for (let i=0; i < bandChoice.length; i++) {
        // Use Moment to change the response.data.datetime value into desired format
        let venueDate = moment(bandChoice[i].datetime).format("MM/DD/YYYY");
  
        console.log(` \nArtist: ${bandChoice[i].lineup[0]} \nVenue Name: ${bandChoice[i].venue.name} \nVenue Location: ${bandChoice[i].venue.city}, ${bandChoice[i].venue.country} \nEvent Date: ${venueDate}`)
      }
    }
    else { 
      console.log('Please try again with another Artist/Band Name')
    }
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

function doWhatItSays() { 
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // Separate the command from userSearch
    const dataArr = data.split(", ");
  
    // Include the separated strings in their respective variables
    command = dataArr[0];
    userSearch = dataArr[1];
    
    action(command, userSearch);
  });
}