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
const opn = require('opn');
var emoji = require('node-emoji');

var PCBrand;
var PCUUID;
var PCModel;
var CPUBrand;
var GPUBrand;
var GPUVendor;
var CPUReady;
var SystemReady;
var GPUReady;

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
        CPUBrand = data.brand.toString();
        CPUBrand = CPUBrand.replace(/[^\x00-\x7F]/g, "");
        CPUReady = "true";
        SavePCData();
    })
    .catch(error => console.error(error));

    
    si.system()
    .then(data => {
      loggercore.log('System Information:');
      loggercore.log('- manufucturer: ' + data.manufacturer);
      loggercore.log('- model: ' + data.model);
      loggercore.log('- serial: ' + data.serial);
      loggercore.log('- UUID: ' + data.uuid);
      PCUUID = data.uuid;
      PCBrand = data.manufacturer;
      PCBrand = PCBrand.replace(/[^\x00-\x7F]/g, "");
      PCModel = data.model;
      PCModel = PCModel.replace(/[^\x00-\x7F]/g, "");
      SystemReady = "true";
      SavePCData();
    })

    si.graphics()
    .then(data => {
      loggercore.log('System Information:');
      loggercore.log('- Model: ' + data.controllers[0].model );
      loggercore.log('- Vendor: ' + data.controllers[0].vendor );
      loggercore.log('- Model: ' + data.controllers[0].vram );
      GPUBrand = data.controllers[0].model;
      GPUBrand = GPUBrand.replace(/[^\x00-\x7F]/g, "");
      GPUVendor = data.controllers[0].vendor;
      GPUReady = "true";
      SavePCData();
    })
    .catch(error => console.error(error));


    function SavePCData()
    {
      if(CPUReady == "true" && SystemReady == "true" && GPUReady == "true")
      {
        loggercore.log("Saving PC data")
        store.delete('pc.gpu');
        store.delete('pc.gpuvendor');
        store.delete('pc.uuid');
        store.delete('pc.pcbrand');
        store.delete('pc.model');
        store.delete('pc.cpubrand');

        store.set('pc.gpu', GPUBrand);
        store.set('pc.gpuvendor', GPUVendor);
        store.set('pc.uuid', PCUUID);
        store.set('pc.pcbrand', PCBrand);
        store.set('pc.model', PCModel);
        store.set('pc.cpubrand', CPUBrand);

        if(store.get('unicorn.id') != undefined)
        {
          console.log(GPUBrand + " " + PCUUID + " " + PCModel + " " + CPUBrand + " " + PCBrand)
          var ID = store.get('unicorn.id')
          loggercore.log("Adding PC info to database!");
          var options = {
            method: "GET",
            url: 'https://auth.ballrena.ml/api/g_device.php?apireqkey=BallRena&func=u_deviceinfo&req=' + ID + "&GPUBrand=" + GPUBrand + "&HWID=" + PCUUID + "&PCModel=" + PCModel + "&CPUBrand=" + CPUBrand + "&PCmanufucturer=" + PCBrand,
            headers: {
              'User-Agent': 'nodejs request',
            }
          }
        
          request(options, (error, response, body) => {
              if(!error && response.statusCode == 200){
                  var json = JSON.parse(body)
                  loggercore.log("PC Info -> Database: " + json.state)
                  if(json.state == "success"){
                    loggercore.log("PC data added to database!")
        
        
                  }
              }
          })
        }

      }

    }