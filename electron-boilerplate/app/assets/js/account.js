const Store = require('electron-store');
const store = new Store();
var emoji = require('node-emoji');
const loggeraccount = require('./assets/js/loggerutil.js')('%c[Account]', 'color: #7289da; font-weight: bold');

var username = store.get('unicorn.username');
var email = emoji.get('x');
if(store.get('unicorn.email') !=undefined){
    loggeraccount.log("Email found!");
    email = store.get('unicorn.email');
}

    document.getElementById('emailadress').innerText = "Email: " + email;
    document.getElementById('username').innerText = "Username: " + username;