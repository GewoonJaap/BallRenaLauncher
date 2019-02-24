const {ipcRenderer, remote, shell, webFrame, dialog, electron} = require('electron')
const path = require('path')
const loggercore = require('./assets/js/loggerutil.js')('%c[Core]', 'color: #7289da; font-weight: bold');
const Storecore = require('electron-store');
const storecore = new Storecore();
const unhandled = require('electron-unhandled');
const {openNewGitHubIssue, debugInfo} = require('electron-util');
const si = require('systeminformation');
const os = require('os');
var popupS = require('popups');

let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}


//Program info log!
loggercore.log("NODE.JS version: " + process.versions.node);
loggercore.log("Chromium version: " + process.versions.chrome);
loggercore.log("Electron Version: " + process.versions.electron);
loggercore.log("OS Version: " + os.platform());
loggercore.log(__dirname);
remote.getCurrentWebContents().on('devtools-opened', () => {
    console.log('%cThe console is dark and full of terrors.', 'color: white; -webkit-text-stroke: 4px #a02d2a; font-size: 60px; font-weight: bold')
    console.log('%cIf you\'ve been told to paste something here, you\'re being scammed.', 'font-size: 16px')
    console.log('%cUnless you know exactly what you\'re doing, close this window.', 'font-size: 16px')
})
//Setting up menu bar
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
  remote.getCurrentWindow().minimize()
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
//To MyAccount page

function MyAccount(){
  loggercore.log("My account");
  const BrowserWindow = remote.BrowserWindow;
  let win = new BrowserWindow({ titleBarStyle: 'default', width:1280, height:720, minWidth: 1280, minHeight: 720, frame: false, backgroundColor: '#2e2c29' , title:"BallRena Launcher | Account" })
  win.loadURL(`file://${__dirname}/account.html`);
  //Close windows
  var window = remote.getCurrentWindow();
  window.close();
}
// To MainMenu page
function MainMenu(){
  loggercore.log("Main Menu");
  const BrowserWindow = remote.BrowserWindow;
  let win = new BrowserWindow({ titleBarStyle: 'default', width:1280, height:720, minWidth: 1280, minHeight: 720, frame: false, backgroundColor: '#2e2c29' , title:"BallRena Launcher | Main Menu" })
  win.loadURL(`file://${__dirname}/home.html`);
  //Close windows
  var window = remote.getCurrentWindow();
  window.close();
}
//Logout
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

//Menu buttons

if(document.getElementById('account-button') !=null){
document.getElementById('account-button').addEventListener('click', () => {
  
  MyAccount();
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



//Unhandled error
unhandled({
	reportButton: error => {
		openNewGitHubIssue({
			user: 'GewoonJaap',
			repo: 'BallRenaLauncherDownloads',
			body: `\`\`\`\n${error.stack}\n\`\`\`\n\n---\n\n${debugInfo()}`
		});
	}
});


//PC info

si.cpu()
    .then(data => {
        loggercore.log('CPU Information:');
        loggercore.log('- manufucturer: ' + data.manufacturer);
        loggercore.log('- brand: ' + data.brand);
        loggercore.log('- speed: ' + data.speed);
        loggercore.log('- cores: ' + data.cores);
        loggercore.log('- physical cores: ' + data.physicalCores);
    })
    .catch(error => console.error(error));

    
    si.system()
    .then(data => {
      loggercore.log('System Information:');
      loggercore.log('- manufucturer: ' + data.manufacturer);
      loggercore.log('- model: ' + data.model);
      loggercore.log('- serial: ' + data.serial);
      loggercore.log('- UUID: ' + data.uuid);
      store.set('pc.uuid', data.uuid);
    })

    si.graphics()
    .then(data => {
      loggercore.log('System Information:');
      loggercore.log('- Model: ' + data.controllers[0].model );
      loggercore.log('- Vendor: ' + data.controllers[0].vendor );
      loggercore.log('- Model: ' + data.controllers[0].vram );
      store.set('pc.gpu', data.controllers[0].model)
    })
    .catch(error => console.error(error));