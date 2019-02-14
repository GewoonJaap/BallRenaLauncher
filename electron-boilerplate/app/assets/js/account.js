const Store = require('electron-store');
const store = new Store();
var emoji = require('node-emoji');
const loggeraccount = require('./assets/js/loggerutil.js')('%c[Account]', 'color: #7289da; font-weight: bold');

var username = store.get('unicorn.username');
var email = emoji.get('x');
var banned = store.get('unicorn.banned');
var bannedvar;
loggeraccount.log("Banned: " + banned)
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

    document.getElementById('emailadress').innerText = "Email: " + email;
    document.getElementById('username').innerText = "Username: " + username;
    document.getElementById('banned').innerText = "Banned: " + bannedvar;