var request = require('request');
const loggerbackend = require('./assets/js/loggerutil.js')('%c[Backend]', 'color: #7289da; font-weight: bold');
const fs = require('fs');
var socket = io('https://backend.ballrena.ml/');
var loginkey = store.get('unicorn.loginkey')
GetUserStats();
var rank;

//Socket functions

socket.on('connect', function(){
    loggerbackend.log("Connected to master server!"); 
    
  });

  socket.on('UUID', function(data) {
    loggerbackend.log(data.message);
   var socketinfo = JSON.parse(data.message)
   store.set('game.online', socketinfo.Online);
  })
  socket.on('Version', function(data) {
    loggerbackend.log(data.message);
   var socketversion = JSON.parse(data.message);
   if(document.title == 'BallRena | Home'){
    GetLatestRelease();
    loggerbackend.log("Getting latest game version: " + socketversion.NewGameVersion);
   }
   else{
     loggerbackend.log("New game version availible! " + socketversion.NewGameVersion);
   }

  })
  socket.on('online', function(data) {
    var socketonline = JSON.parse(data.message)
    store.set('game.online', socketonline.OnlinePlayers);
    if(document.title == 'BallRena | Account'){
      document.getElementById('online').innerHTML = "Players online: " + socketonline.OnlinePlayers;
    }
  })

  socket.on('disconnect', function(){
    loggerbackend.log("Connection lost! Trying to reconnect....");
    popupS.alert({
      title:   "Connectivity issue's!",
      content: 'Connection to server lost!'
  });
});


//API functions

function BacktoLogin(){
  storecore.delete('unicorn.username');
  storecore.delete('unicorn.password');
  storecore.delete('unicorn.loginkey');
  const BrowserWindow = remote.BrowserWindow;
  let win = new BrowserWindow({ titleBarStyle: 'default', width:800, height:600, minWidth: 800, minHeight: 600, frame: false, backgroundColor: '#2e2c29' , title:"BallRena Launcher | Login" })
  win.loadURL(`file://${__dirname}/login.html`);
  //Close windows
  var window = remote.getCurrentWindow();
  window.close();
}

function GetUserStats(){
    
  var options = {
    method: "GET",
    url: 'https://auth.ballrena.ml/api/g_userinfo.php?apireqkey=BallRena&func=login&loginreqkey=' + loginkey,
    headers: {
      'User-Agent': 'nodejs request',
    }
  }

  request(options, (error, response, body) => {
      if(!error && response.statusCode == 200){
          var json = JSON.parse(body)
          if(json.state == "success"){
            loggerbackend.log(json);
            store.delete('unicorn.exp');
            store.delete('unicorn.id');
            store.delete('unicorn.ip');
            store.delete('unicorn.email');
            store.delete('unicorn.rank');
            store.delete('unicorn.banned');
            store.delete('unicorn.level');
            
            //Save info
            store.set('unicorn.exp', json.exp);
            store.set('unicorn.id', json.id);
           // store.set('unicorn.ip', json.ip);
            store.set('unicorn.email', json.email);
            store.set('unicorn.rank', json.rank);
            store.set('unicorn.banned', json.banstatus);
            store.set('unicorn.level', json.level);
            loggerbackend.log("Saved..")

            //Get page
            if(document.title == "BallRena | Account")
            {
              loggerbackend.log("Account page")
              document.getElementById('xp').innerHTML = "XP: " + json.exp;
              document.getElementById('role').innerHTML = "Role: " + json.rank;
              document.getElementById('level').innerHTML = "Level: " + json.level;
            }

          }
          else{
            BacktoLogin();
          }
      }
      else{
        BacktoLogin();
      }
  })

}