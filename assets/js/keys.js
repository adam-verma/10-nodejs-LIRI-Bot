console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  };

exports.bandsintown = { 
    id: process.env.BIT_ID
}; 

exports.omdb = { 
    key: process.env.OMDB_KEY
}; 