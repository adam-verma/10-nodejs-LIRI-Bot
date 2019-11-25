// This is a command line Node application that utilizes APIs for Spotify, Bands in Town, and OMDB

// Load the NPM packages dotenv, inquirer, and axios 
require('dotenv').config();
const inquirer = require('inquirer');
const axios = require('axios'); 

// Set the API id/key from keys.js as variables
let keys = require("./keys.js"); 
let spotify = new Spotify(keys.spotify);
let bandsintown = new BandsInTown(keys.bandsintown);
let omdb = new OMDB(keys.omdb); 

// Create functions returning these commands: concert-this, spotify-this-song, movie-this, do-what-it-says


