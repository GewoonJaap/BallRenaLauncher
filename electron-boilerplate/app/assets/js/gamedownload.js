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
            if(store.get('unicorn.gameversion') == store.get('game.version'))
            {
                document.getElementById('DownloadButton').innerHTML = "Play" + emoji.get('video_game')
                loggerhome.log("Game is up-to-date!");
                store.set('game.ready', "true");
            }
            if(store.get('unicorn.gameversion') != undefined && store.get('unicorn.gameversion') != store.get('game.version')){
                document.getElementById('DownloadButton').innerHTML = "Update | v" + GameVersionLatest;
                loggerdownload.log("Update required!")
                store.set('game.ready', "false");
                notifier.notify({
                  appName: 'nl.ballrena.electronjslauncher',
                  title: 'BallRena Update',
                  message: `BallRena is ready to get updated!`,
                  sound: false,
                  wait: true,
                  icon: __dirname + './assets/img/avatar.png'
                }, (err) => {
                  if (err) {
                    console.error('Snoretoast error: ', err);
                  }
                });
            }
            else if(store.get('unicorn.gameversion') == undefined){
                document.getElementById('DownloadButton').innerHTML = "Install | v" + GameVersionLatest;
                loggerhome.log("Game is not installed yet!");
                store.set('game.ready', "false");
            }
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
             else{
               loggerdownload.log("Getting games failed. Error: " + response.statusCode)
               var jsonerror = JSON.parse(body);
               loggerdownload.log(jsonerror.message)
               OpenNoticeBar(" | Getting game version failed (" + response.statusCode + "). Try again later.")
             }

          })
      }
