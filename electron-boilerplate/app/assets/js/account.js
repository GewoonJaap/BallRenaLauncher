const Store = require('electron-store');
const store = new Store();
var emoji = require('node-emoji');
const loggeraccount = require('./assets/js/loggerutil.js')('%c[Account]', 'color: #7289da; font-weight: bold');
const loggeruninstaller = require('./assets/js/loggerutil.js')('%c[Uninstaller]', 'color: #ff0000; font-weight: bold');
var fsextra = require('fs-extra')

//Account var
var username = store.get('unicorn.username');
var email = emoji.get('x');
var banned = store.get('unicorn.banned');
var bannedvar;
loggeraccount.log("Banned: " + banned)

//Game var
var installed = store.get('game.ready');


//Game func
function UninstallGame(){
    document.getElementById('gameinstalled').innerText = "Game: Uninstalling";
    store.set('game.ready', "false");
    store.delete('unicorn.gameversion');
    var home = require("os").homedir();
    fsextra.removeSync(home + '/Documents/BallRena'); 
    loggeruninstaller.log("Uninstalled");
    loggeruninstaller.log("Remaking dir..");
    var mkdirp = require('mkdirp');
    mkdirp(home+ '/Documents/BallRena/Game', function (err) {
    if (err) console.error(err)
    else console.log('BallRena folder made');
    });
    mkdirp(home+ '/Documents/BallRena/Updates', function (err) {
        if (err) console.error(err)
        else console.log('BallRena folder made');
        });
    document.getElementById('gameinstalled').innerText = "Uninstalled"

}
//Menu funcs
function ToAccount(){
    document.getElementById('basicaccounttext').style.visibility = "visible";
    document.getElementById('basicaccounttext').style.height = "unset";
    document.getElementById('basicgame').style.visibility = "collapse";
    document.getElementById('basicgame').style.height = 0;
}
function ToGame(){
    document.getElementById('basicaccounttext').style.visibility = "collapse";
    document.getElementById('basicaccounttext').style.height = 0;
    document.getElementById('basicgame').style.visibility = "visible";
    document.getElementById('basicgame').style.height = "unset";
}

//Account funcs
if(store.get('unicorn.email') !=undefined){
    loggeraccount.log("Email found!");
    email = store.get('unicorn.email');
}

if(banned != "false"){
    bannedvar = emoji.get('heavy_check_mark');
}
else if(banned = "false"){
    bannedvar = emoji.get('x');
}
//Set text

    document.getElementById('emailadress').innerText = "Email: " + email;
    document.getElementById('username').innerText = "Username: " + username;
    document.getElementById('banned').innerText = "Banned: " + bannedvar;
    document.getElementById('online').innerText = "Players online: " + store.get('game.online');
    document.getElementById('HWID').innerText = "HardwareID: " + store.get("pc.uuid");
    document.getElementById('GPU').innerText = "Graphics card: " + store.get('pc.gpu');
    if(store.get('game.version') == undefined){
        document.getElementById('gameinstalled').innerText = "Game version: Not installed!";
    }
    else{
    document.getElementById('gameinstalled').innerText = "Game version: " + store.get('game.version');
    }

//Game func