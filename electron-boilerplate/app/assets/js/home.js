var open = require("open");
const {app, BrowserWindow, ipcMain, Menu } = require('electron')
const loggerhome = require('./assets/js/loggerutil.js')('%c[Main Menu]', 'color: #7289da; font-weight: bold');
const Store = require('electron-store');
const store = new Store();
const admZip = require('adm-zip');
const requesthome = require('superagent');
var username;
var url;
var Downloading = false;

username = store.get('unicorn.username');
loggerhome.log("Username found: " + username);
document.getElementById('WelcomeName').innerHTML = "Welcome back, " + username

loggerhome.log("Loaded Home.js");
function OpenLink(url){
    open(url);
}




//Download

function DownloadMBS(){
    if(Downloading == true){
    var url = store.get('game.download')
    var val = url.toString();
    var zipFile = val.substr(val.lastIndexOf("/") + 1)
    const fs = require("fs"); //Load the filesystem module
    const stats = fs.statSync(zipFile)
    const fileSizeInBytes = stats.size
//Convert the file size to megabytes (optional)
    const fileSizeInMegabytes = fileSizeInBytes / 1000000.0
    loggerdownload.log("MB downloaded: " + fileSizeInMegabytes.toFixed(1));
    document.getElementById('DownloadButton').innerHTML = "Downloading | MB: " + fileSizeInMegabytes.toFixed(1);
    setInterval(DownloadMBS,500)
    }
}

function DownloadGame(){
    document.getElementById('DownloadButton').innerHTML = "Downloading..."
    var home = require("os").homedir();
    var url = store.get('game.download')
    var val = url.toString();
    var zipFile = val.substr(val.lastIndexOf("/") + 1)
    const repoName = 'node-zip-download-sample';
    const href = url;
    const extractEntryTo = `${zipFile}/`;
    const outputDir = `./${zipFile}/`;
    const unzip = require('unzip')
    console.log('href', href);
    console.log('extractEntryTo', extractEntryTo);
    console.log('outputDir', outputDir);
    loggerdownload.log('ZipFile', zipFile);
    Downloading = true;
    setInterval(DownloadMBS,1500)


    request
      .get(href)
      .on('error', function(error) {
        loggerdownload.log(error);
      })
      .pipe(fs.createWriteStream(zipFile))
      .on('finish', function() {
        document.getElementById('DownloadButton').innerHTML = "Installing..."
        loggerdownload.log('Installing..');
        Downloading = false;
        fs.createReadStream(zipFile).pipe(unzip.Extract({ path: home + '/Documents/BallRena/Game' }));
        document.getElementById('DownloadButton').innerHTML = "Installed | " + store.get('game.version')
        store.set('unicorn.gameversion', store.get('game.version'));
        store.set('game.installed', "true");
      });
}

