var request = require('request');
var emoji = require('node-emoji');
const loggerdownload = require('./assets/js/loggerutil.js')('%c[Game Downloader]', 'color: #7289da; font-weight: bold');
loggerdownload.log(__dirname)

// Game Info
var ReleaseDatum;
var Publisher;
var GameVersionLatest;
var GameVersionLocal = store.get('game.version'); 
var GameURLArray;
var PatchNotes;
GetLatestRelease()

function GetLatestRelease(){
    loggerdownload.log("Getting game releases...")

    var options = {
        method: "GET",
        url: 'https://api.github.com/repos/GewoonJaap/BallRena-Builds/releases/latest',
        headers: {
          'User-Agent': 'nodejs request',
        }
      }

      request(options, (error, response, body) => {
          if(!error && response.statusCode == 200){
              var json = JSON.parse(body);
            GameVersionLatest = json.tag_name;
            ReleaseDatum = json.published_at;
            Publisher = json.author.login;
            GameURLArray = json.assets;
            PatchNotes = json.body;
            loggerdownload.log("Latest version: " + GameVersionLatest);
            loggerdownload.log("Release Date: " + ReleaseDatum);
            loggerdownload.log("Publisher: " + Publisher);
            loggerdownload.log("Patchnotes: " + PatchNotes);
            loggerdownload.log("Platform: " + os.platform());
            store.set('game.version', GameVersionLatest);
            document.getElementById('patchnotes').innerHTML = PatchNotes;
            document.getElementById('LatestVersion').innerText = "Patchnotes: v" + GameVersionLatest;
            
            for(let i = 0; i < GameURLArray.length; i++){
                if(GameURLArray[i].browser_download_url.indexOf(os.platform()) > -1){
                    loggerdownload.log(GameURLArray[i].browser_download_url)
                    store.set('game.download', GameURLArray[i].browser_download_url);
                    return true;
                }
                else{
                loggerdownload.log("Download " + i + ": " + GameURLArray[i].browser_download_url);
                }
             
                }
             
             }

          })
      }
