const {app, BrowserWindow, ipcMain, Menu } = require('electron')
const loggerhome = require('./assets/js/loggerutil.js')('%c[Main Menu]', 'color: #7289da; font-weight: bold');
const loggerballrena = require('./assets/js/loggerutil.js')('%c[BallRena]', 'color: #26ff00; font-weight: bold');
const Store = require('electron-store');
const store = new Store();
const admZip = require('adm-zip');
const requesthome = require('superagent');
var username;
var url;
var Downloading = false;
var Game_exec

username = store.get('unicorn.username');
loggerhome.log("Username found: " + username);
document.getElementById('WelcomeName').innerHTML = "Welcome back, " + username

loggerhome.log("Loaded Home.js");
function OpenLink(url){
  opn(url);
}


//Open notice bar

function OpenNoticeBar(noticetext){
  document.getElementById('notice').style.height = '4vh';
  document.getElementById('notice').style.visibility = 'visible';
  document.getElementById('noticetext').innerHTML = noticetext;
}

function CloseNoticeBar(){
  document.getElementById('notice').style.height = '0';
  document.getElementById('notice').style.visibility = 'hidden';
}

//Download

function DownloadMBS(){
    if(Downloading == true){
     var home = require("os").homedir();
    var url = store.get('game.download')
    var val = url.toString();
    var zipFile = val.substr(val.lastIndexOf("/") + 1)
    const fs = require("fs"); //Load the filesystem module
    if(fs.statSync(home + '/Documents/BallRena/Updates/' + zipFile).isFile()){
    const stats = fs.statSync(home + '/Documents/BallRena/Updates/' + zipFile)
    const fileSizeInBytes = stats.size
//Convert the file size to megabytes (optional)
    const fileSizeInMegabytes = fileSizeInBytes / 1000000.0
    loggerdownload.log("MB downloaded: " + fileSizeInMegabytes.toFixed(1));
    document.getElementById('DownloadButton').innerHTML = "Downloading | MB: " + fileSizeInMegabytes.toFixed(1);
    }
    
    else{
      loggerdownload.log(__dirname)
      loggerdownload.log("Cannot download. File exists? " + require('fs').existsSync(home + '/Documents/BallRena/Updates/' + zipFile))
      document.getElementById('DownloadButton').innerHTML = "We are having trouble downloading. ;/"
    }
  }
    setInterval(DownloadMBS,500)
}

function CHMODFix(){
  if(os.platform() == "darwin"){
  var home = require("os").homedir();
  var shell = require('shelljs');
  console.log(home)
  shell.cd(home + '/Documents/BallRena/Game/MacVersie.app/Contents/MacOS/')
   shell.chmod('+x', 'MacVersie')
   document.getElementById('DownloadButton').innerHTML = "Installed | " + store.get('game.version')
   store.set('game.installed', "true");
  // fs.chmodSync(home + '/Documents/BallRena/Game/MacVersie.app/Contents/MacOS/*', '755');
  }
}

function DownloadGame(){
  if(store.get('unicorn.banned') == "true"){
    document.getElementById('DownloadButton').innerHTML = "Access Denied"
  }
  else{
  var home = require("os").homedir();
  var child = require('child_process').execFile;
  
  if(store.get("game.ready") == "true"){
    CHMODFix()
    loggerhome.log("Launching game....");
    if(os.platform() == "win32")
    {
      var executablePath = home + '/Documents/BallRena/Game/BallRenaGame.exe';
    }
    else{
      var executablePath = home + '/Documents/BallRena/Game/MacVersie.app/Contents/MacOS/MacVersie';
    }
      
child(executablePath, [store.get('unicorn.loginkey')], function(err, data) {
    if(err){
       loggerhome.error(err);
       return;
    }
 
    loggerballrena.log(data.toString());
});
    
  }
  else{
    document.getElementById('DownloadButton').innerHTML = "Downloading...";
    var AdmZip = require('adm-zip');
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
    setInterval(DownloadMBS,5000)
    loggerdownload.log("Downloading..")


    request
      .get(href)
      .on('error', function(error) {
        loggerdownload.log(error);
      })
      .pipe(fs.createWriteStream(home + '/Documents/BallRena/Updates/' + zipFile))
      .on('finish', function() {
        document.getElementById('DownloadButton').innerHTML = "Installing..."
        loggerdownload.log('Installing..');
        Downloading = false;
        var zip = new AdmZip(home + '/Documents/BallRena/Updates/' + zipFile);
        zip.extractAllTo(home + '/Documents/BallRena/Game', /*overwrite*/true);

       // fs.createReadStream(home + '/Documents/BallRena/Updates/' + zipFile).pipe(unzip.Extract({ path: home + '/Documents/BallRena/Game' }));

        document.getElementById('DownloadButton').innerHTML = "Installed | " + store.get('game.version')
        store.set('unicorn.gameversion', store.get('game.version'));
        store.set('game.installed', "true");
        if(require("os").platform() == "darwin"){
          loggerdownload.log("CHMOD fix")
          store.set('game.installed', "false");
          document.getElementById('DownloadButton').innerHTML = "Installing. | " + store.get('game.version')
          setInterval(CHMODFix,2500)
        }

        //Notification
       if(require('os').platform() == "win32"){
        notifier = require('node-notifier');
        notifier.notify({
          appName: 'nl.ballrena.electronjslauncher',
          title: 'BallRena Game',
          message: `BallRena is up-to-date`,
          sound: false,
          wait: true,
          icon: __dirname + './assets/img/BallRenaMiniLogo.png'
        }, (err) => {
          if (err) {
            console.error('Snoretoast error: ', err);
          }
        });

      }
        //Check for update
        GetLatestRelease();
      });
    }
  }
}

