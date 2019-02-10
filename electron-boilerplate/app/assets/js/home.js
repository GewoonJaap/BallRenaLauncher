var open = require("open");
const {app, BrowserWindow, ipcMain, Menu } = require('electron')
const loggerhome = require('./assets/js/loggerutil.js')('%c[Main Menu]', 'color: #7289da; font-weight: bold');
const Store = require('electron-store');
const store = new Store();
var username;

username = store.get('unicorn.username');
loggerhome.log("Username found: " + username);
document.getElementById('WelcomeName').innerHTML = "Welcome back, " + username

loggerhome.log("Loaded Home.js");
function OpenLink(url){
    open(url);
}

