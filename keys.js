//API Keys


console.log('this is loaded');
console.log(process.env.TWITTER_CONSUMER_KEY);

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

//FOR IMDB use trilogy's API key and the NPM request package




//COMMANDS LIRI BOT SHOULD RECOGNIZE


//node liri.js my-tweets
//node liri.js spotify-this-song '<song name here>'
//node liri.js movie-this '<movie name here>'


//should output the following:
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.


//if no movie is typed in, it should return data for movie "Mr. Nobody"



//BONUS!
//output the data in a .txt file. append each command to the log.txt file without overriding it. 