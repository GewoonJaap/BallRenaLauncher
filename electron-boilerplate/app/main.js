// Modules to control application life and create native browser window
const {app, BrowserWindow, remote, electron} = require('electron');
const isDev = require('electron-is-dev');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  if(!isDev){
  mainWindow.loadFile('./app/main.html')
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

const { autoUpdater } = require("electron-updater")

autoUpdater.logger = require('./assets/js/loggerutil.js')('%c[Updater]', 'color: #7289da; font-weight: bold');
UpdaterLog = require('./assets/js/loggerutil.js')('%c[Updater]', 'color: #7289da; font-weight: bold');
if(!isDev){
autoUpdater.on('checking-for-update', () =>{
    UpdaterLog.log("Checking for update");
})

autoUpdater.on('update-available', (info) => {
UpdaterLog.log("Update available");
//UpdaterLog.log("Version: " + info.version);
//UpdaterLog.log("Release date: "+ info.releaseDate);
autoUpdater.downloadUpdate();
})

autoUpdater.on('update-not-available', () =>{
    UpdaterLog.log("No version available");
    const loggermain = require('./assets/js/loggerutil.js')('%c[Main]', 'color: #7289da; font-weight: bold');
    //Open login screen
    const BrowserWindow = electron.remote.BrowserWindow;
    let win = new BrowserWindow({ titleBarStyle: 'default', width: 800, height: 600, frame: false, backgroundColor: '#2e2c29' , title:"BallRena Launcher | Login" })
    loggermain.log("Booting up.....");
    win.loadURL(`file://${__dirname}/login.html`);
    win.webContents.openDevTools()
    //Close windows
    var window = electron.remote.getCurrentWindow();
    window.close();
})

autoUpdater.on('download-progress', (progress) =>{
    UpdaterLog.log(`Progress ${Math.floor(progress.percent)}`);
})

autoUpdater.on('update-downloaded', (info) =>{
    UpdaterLog.log("Done");
    autoUpdater.quitAndInstall();
})

autoUpdater.on('error', (error) =>{
    UpdaterLog.error(error)
})

}