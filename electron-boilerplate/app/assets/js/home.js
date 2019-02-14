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

//Get game
if(store.get('unicorn.gameversion') != undefined){
document.getElementById('DownloadButton').innerHTML = "Game version: " + store.get('unicorn.gameversion')
}
else{
    document.getElementById('DownloadButton').innerHTML = "Download"
}


//Download

function DownloadMBS(){
    if(Downloading == true){
    const fs = require("fs"); //Load the filesystem module
    const stats = fs.statSync("v.0.0.2.zip")
const fileSizeInBytes = stats.size
//Convert the file size to megabytes (optional)
const fileSizeInMegabytes = fileSizeInBytes / 1000000.0
console.log(fileSizeInMegabytes.toFixed(1));
    document.getElementById('DownloadButton').innerHTML = "Downloading | MB: " + fileSizeInMegabytes.toFixed(1);
    setInterval(DownloadMBS,500)
    }
}

function DownloadGame(){
    Downloading = true;
    DownloadMBS();
    document.getElementById('DownloadButton').innerHTML = "Downloading..."
    var home = require("os").homedir();
    const repoName = 'node-zip-download-sample';
    const href = `https://www.ballrena.ml/assets/launcher`;
    const zipFile = 'v.0.0.2.zip';
    const source = `${href}/${zipFile}`;
    const extractEntryTo = `${zipFile}/`;
    const outputDir = `./${zipFile}/`;
    const unzip = require('unzip')
    console.log('href', href);
    console.log('source', source);
    console.log('extractEntryTo', extractEntryTo);
    console.log('outputDir', outputDir);



    request
      .get(source)
      .on('error', function(error) {
        console.log(error);
      })
      .pipe(fs.createWriteStream(zipFile))
      .on('finish', function() {
        console.log('finished dowloading');
        Downloading = false;
        fs.createReadStream(zipFile).pipe(unzip.Extract({ path: home + '/Documents/BallRena/Game' }));
        document.getElementById('DownloadButton').innerHTML = "Downloaded.."
        store.set('unicorn.gameversion', 'v1.0')
      });
}

