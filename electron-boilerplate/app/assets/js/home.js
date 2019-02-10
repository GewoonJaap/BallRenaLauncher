var open = require("open");
const {app, BrowserWindow, ipcMain, Menu } = require('electron')
const loggerhome = require('./assets/js/loggerutil.js')('%c[Main Menu]', 'color: #7289da; font-weight: bold');
loggerhome.log("Loaded Home.js");
function OpenLink(url){
    open(url);
}