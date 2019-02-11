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
document.getElementById('minimize-button').addEventListener('click', () => {
  MyAccount();
})
document.getElementById('logout-button').addEventListener('click', () => {
LogOut();
})

function MyAccount(){
  loggercore.log("My account");
}

function LogOut(){
  loggercore.log("Logging out....")
  storecore.delete('unicorn.username');
  storecore.delete('unicorn.password');
  const BrowserWindow = remote.BrowserWindow;
  let win = new BrowserWindow({ titleBarStyle: 'default', width: 800, height: 600, frame: false, backgroundColor: '#2e2c29' , title:"BallRena Launcher | Login" })
  win.loadURL(`file://${__dirname}/login.html`);
  //Close windows
  var window = remote.getCurrentWindow();
  window.close();
}

document.getElementById('account-button').addEventListener('click', () => {
  remote.getCurrentWindow().minimize()
})

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