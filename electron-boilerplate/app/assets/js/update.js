const electron = require('electron');
const { autoUpdater } = require("electron-updater")

autoUpdater.logger = require('./assets/js/loggerutil.js')('%c[Updater]', 'color: #7289da; font-weight: bold');
UpdaterLog = require('./assets/js/loggerutil.js')('%c[Updater]', 'color: #7289da; font-weight: bold');

autoUpdater.on('checking-for-update', () =>{
    UpdaterLog.log("Checking for update");
})

autoUpdater.on('update-available', (info) => {
UpdaterLog.log("Update available");
//UpdaterLog.log("Version: " + info.version);
//UpdaterLog.log("Release date: "+ info.releaseDate);
})

autoUpdater.on('update-not-available', () =>{
    UpdaterLog.log("No version available");
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

electron.app.on('ready', () =>{
        autoUpdater.checkForUpdates();
})