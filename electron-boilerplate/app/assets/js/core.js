const {ipcRenderer, remote, shell, webFrame, dialog, electron} = require('electron')
const path = require('path')
const loggercore = require('./assets/js/loggerutil.js')('%c[Core]', 'color: #7289da; font-weight: bold');
const Storecore = require('electron-store');
const storecore = new Storecore();


//Program info log!
loggercore.log("NODE.JS version: " + process.versions.node);
loggercore.log("Chromium version: " + process.versions.chrome);
loggercore.log("Electron Version: " + process.versions.electron)
loggercore.log(__dirname);
remote.getCurrentWebContents().on('devtools-opened', () => {
    console.log('%cThe console is dark and full of terrors.', 'color: white; -webkit-text-stroke: 4px #a02d2a; font-size: 60px; font-weight: bold')
    console.log('%cIf you\'ve been told to paste something here, you\'re being scammed.', 'font-size: 16px')
    console.log('%cUnless you know exactly what you\'re doing, close this window.', 'font-size: 16px')
})

if(process.defaultApp){
    if(process.argv.length >= 2){
        app.setAsDefaultProtocolClient('BallRenaLauncher', process.execPath, [path.resolve(process.argv[1])])
    }
    else{
        app.setAsDefaultProtocolClient('BallRenaLauncher')
    }
}
if(document.getElementById('minimize-button') !=null){
document.getElementById('minimize-button').addEventListener('click', () => {
  MyAccount();
})
}
if(document.getElementById('mainmenu-button') !=null){
document.getElementById('mainmenu-button').addEventListener('click', () => {
  MainMenu();
})
}
if(document.getElementById('logout-button') !=null){
document.getElementById('logout-button').addEventListener('click', () => {
LogOut();
})
}

function MyAccount(){
  loggercore.log("My account");
  const BrowserWindow = remote.BrowserWindow;
  let win = new BrowserWindow({ titleBarStyle: 'default', width:1280, height:720, minWidth: 1280, minHeight: 720, frame: false, backgroundColor: '#2e2c29' , title:"BallRena Launcher | Account" })
  win.loadURL(`file://${__dirname}/account.html`);
  //Close windows
  var window = remote.getCurrentWindow();
  window.close();
}

function MainMenu(){
  loggercore.log("Main Menu");
  const BrowserWindow = remote.BrowserWindow;
  let win = new BrowserWindow({ titleBarStyle: 'default', width:1280, height:720, minWidth: 1280, minHeight: 720, frame: false, backgroundColor: '#2e2c29' , title:"BallRena Launcher | Main Menu" })
  win.loadURL(`file://${__dirname}/home.html`);
  //Close windows
  var window = remote.getCurrentWindow();
  window.close();
}

function LogOut(){
  loggercore.log("Logging out....")
  storecore.delete('unicorn.username');
  storecore.delete('unicorn.password');
  const BrowserWindow = remote.BrowserWindow;
  let win = new BrowserWindow({ titleBarStyle: 'default', width:800, height:600, minWidth: 800, minHeight: 600, frame: false, backgroundColor: '#2e2c29' , title:"BallRena Launcher | Login" })
  win.loadURL(`file://${__dirname}/login.html`);
  //Close windows
  var window = remote.getCurrentWindow();
  window.close();
}
if(document.getElementById('account-button') !=null){
document.getElementById('account-button').addEventListener('click', () => {
  remote.getCurrentWindow().minimize()
})
}
document.getElementById('min-max-button').addEventListener('click', () => {
  const currentWindow = remote.getCurrentWindow()
  if(currentWindow.isMaximized()) {
    currentWindow.unmaximize()
  } else {
    currentWindow.maximize()
  }
})

document.getElementById('close-button').addEventListener('click', () => {
  remote.app.quit()
})