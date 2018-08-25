require("dotenv").config();

//add code to import the keys.js file (store in variable)

//accessing keys information
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//new instance of class. class name needs a capital letter. with new include capital letter
//prototype is a way to create a class. make constructor and protoype lets you add the methods to them


//Stored argument's array
var incoming = process.argv;
var command = process.argv[2];
//movie or song
var data = "";
var song = process.argv.slice(3).join(" ");
console.log(song);
//changing the input to a string

//attaches multiple word arguments
for (var i=3; i<incoming.length; i++){
  if(i>3 && i<incoming.length){
    data = data + "+" + incoming[i];
  } else{
    data = data + incoming[i];
    // console.log(data);
    // debugger;
  }
}

//switch case
switch(command){
  case "my-tweets":
    showTweets();
  break;

  case "spotify-this-song":
    if(song){
      spotifySong(song);
    } else{
      spotifySong("The Sign");
    }
  break;

  case "movie-this":
    if(song){
      omdbData(song)
    } else{
      omdbData("Mr. Nobody")
    }
  break;

  case "do-what-it-says":
    doIt(command);
  break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
}

function showTweets(){   
  var params = {screen_name: 'DianthusGarnet'};
  // debugger;
  //Display last 20 Tweets
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    // console.log(response);
    // console.log("error: " + error.message);
    // console.log("tweets: " + tweets.length);
    // console.log("response: " + response.

    if(!error){
      for(var i = 0; i<tweets.length; i++){
        
        var date = tweets[i].created_at;
        console.log(date);
     
        console.log("@DianthusGarnet" + "  " + tweets[i].text + " Created At: " + date.substring(0, 19));
        console.log("-----------------------");
        
        //substring takes the first noted characters out of the string
        //resources with the classes and the methods in them MDN on Mozilla and W3 schools too
        //twitter documentation - check the API reference
        //to check:
        //console.log with the JSON stringify - example for all tweets[i]
        //making keys work for authentication
        //use unprotected tweets


        // NOTES ON PACKAGE INSTALL
        //for package install: make sure modules are in with npm i twitter (or whatever)
        //for global installed the chromedriver, now it opens but gets stuck, tried global install up to .profile
        //dyn-129-236-228-26:28-NodeDebug garnetdianthus$ inspect weatherdest.js
        // /Users/garnetdianthus/Repoman/COLNYC201806FSF2-Class-Repository-FSF/10-nodejs/10.3/28-NodeDebug/weatherdest.js:35
        // var fullAddress = data.results[0].formatted_address;



        // adds text to log.txt file

        fs.appendFile('entries.txt', " " + tweets[i].text + " Created At: " + date.substring(0, 19));
        fs.appendFile('entries.txt', "-----------------------");
       }
    }else{
      console.log('Error occurred');
    }
  });
}

function spotifySong(song){

  // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  //   if (err) {
  //     return console.log('Error occurred: ' + err);
  //   }
   
  // console.log(data); 
  // });

  //get to exact match, can be an option in the command line

  spotify.search({ type: 'track', query: song }, function(error, data){
    
    fs.writeFileSync('songs.txt','Spotify Tracks Results: ' + song + "\n\n" );
    var edit = data;
    //special character in javascript

    if (error) {
      return console.log('Error occurred: ' + error);
    }

      for(var i = 0; i < edit.tracks.items.length; i++){
        var songData = edit.tracks.items[i];
        //artist

        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
        
        var output = [];
        output.push(songData.artists[0].name);
        output.push(songData.name);
        output.push(songData.preview_url);
        output.push(songData.album.name);
        output.push( "-----------------------");

        // adds text to .txt
        fs.appendFileSync('songs.txt', output.join("\n")+ "\n");
      
       
     }  

    //append file one string with line breaks

  });
}

//song is a newly declared variable here
//its okay to rename song
function omdbData(song){
  var omdbURL = 'http://www.omdbapi.com/?t=' + song + '&plot=short&tomatoes=true&apikey=trilogy';

  //ADD A WRITE FILE SYNC
  //use the song method
  //add a new file

  request(omdbURL, function (error, response, body){
    // if(!error && response.statusCode == 200){
      fs.writeFileSync('movies.txt','IMDB Result: ' + song + "\n\n" );

      console.log(body);
      var body = JSON.parse(body);
      //dont need var here, variable is implicit
      // debugger;
    
      
      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      //adds text to log.txt
      //edit this with the above method

      var movieOutput = [];
      movieOutput.push(body.Title);
      movieOutput.push(body.Year);
      movieOutput.push(body.imdbRating);
      movieOutput.push(body.Country);
      movieOutput.push(body.Language);
      movieOutput.push(body.Plot);
      movieOutput.push(body.Actors);
      movieOutput.push(body.tomatoRating);
      movieOutput.push(body.tomatoURL);
      movieOutput.push( "-----------------------");

        // adds text to .txt
      fs.appendFileSync('movies.txt', movieOutput.join("\n")+ "\n");
      
    // } else{
    //   console.log('Error occurred.')
    // }

    //this is a local copy so it could be renamed.
    if(song === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      // adds text to a .txt
      fs.appendFileSync('errors.txt', "-----------------------");
      fs.appendFileSync('errors.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFileSync('errors.txt', "It's on Netflix!");
    }
  
  });
}

function doIt(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var randomTxt = data.split(',');
    // console.log(randomTxt);

     spotifySong(randomTxt[1]);
  });
}



//LIRI should be able to take in one of the below

// * `my-tweets`

// * `spotify-this-song`

// artists
// song name
// preview of song link
//album song from 
//no song will go to the sign by ace of base



// * `movie-this`

//title of the movie
//year the movie came out
//IMDB rating of the movie
//roteen tomatoes rating of the movie
//country where movie was produced
//language of the movie
//actors in the movie

//otherwise it will run "Mr. Nobody"


// * `do-what-it-says`  using the fs node package
// should take the text in random.txt and run "I Want it That Way"



//1. access data from keys.js


//2. store argument array


// 3.switch case with "my-tweets"  -  shows the last 20 tweets
// "spotify-this-song"  - 
// "movie-this"
//"do-what-it-says"
//these should call functions 

//4.functions for each




