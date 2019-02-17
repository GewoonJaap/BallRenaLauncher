// Modules to control application life and create native browser window
const electron = require('electron');
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');
const {app, BrowserWindow, remote} = require('electron');
const isDev = require('electron-is-dev');
var os = require('os');


// configure logging
var platform = os.platform() + '_' + os.arch();
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  if(!isDev){
  mainWindow.loadFile('./app/update.html')
  mainWindow.webContents.openDevTools();
  autoUpdater.checkForUpdates();
  }
  if(isDev){
    mainWindow.loadFile('./app/main.html')
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//-------------------------------------------------------------------
// Auto updates
//-------------------------------------------------------------------
const sendStatusToWindow = (text) => {
  log.info(text);
  if (mainWindow) {
    mainWindow.webContents.send('message', text);
  }
};

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
  console.log("Checking")
});
autoUpdater.on('update-available', info => {
  if(process.platform == "darwin"){
    sendStatusToWindow('Download the update at: <a href="https://download.ballrena.ml/download">https://download.ballrena.ml/download</a>.');
  }
  else{
    sendStatusToWindow('Update available.');
  }
});
autoUpdater.on('update-not-available', info => {
  sendStatusToWindow('Update not available.');
  mainWindow.loadFile('./app/main.html')
});
autoUpdater.on('error', err => {
  if(process.platform == "darwin"){
    sendStatusToWindow('Download the update at: <a href="https://download.ballrena.ml/download">https://download.ballrena.ml/download</a>.<br>' + err.toString());
  }
  else{
  sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
  }
});
autoUpdater.on('download-progress', progressObj => {
  if(process.platform == "darwin"){
    sendStatusToWindow('Download the update at: <a href="https://download.ballrena.ml/download">https://download.ballrena.ml/download</a>.');
  }
  else{
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
  }
});
autoUpdater.on('update-downloaded', info => {
  sendStatusToWindow('Update downloaded; will install now');
});

autoUpdater.on('update-downloaded', info => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 500 ms.
  // You could call autoUpdater.quitAndInstall(); immediately
  if(process.platform == "darwin"){
    sendStatusToWindow('Download the update at: <a href="https://download.ballrena.ml/download">https://download.ballrena.ml/download</a>.');
  }
  else{
  autoUpdater.quitAndInstall();
  }
});