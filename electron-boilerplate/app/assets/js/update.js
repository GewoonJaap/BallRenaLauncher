const electron = require('electron')
const os = require('os')
const autoUpdater = electron.autoUpdater

UpdaterLog = require('./assets/js/loggerutil.js')('%c[Updater]', 'color: #7289da; font-weight: bold');

function Update()
{

autoUpdater.on('checking-for-update', () =>{
    document.getElementById("maintext").innerText = "Checking for updates...";
    UpdaterLog.log("Checking for update");
})

autoUpdater.on('update-available', (info) => {
UpdaterLog.log("Update available");
document.getElementById("maintext").innerText = "Update available...";
//UpdaterLog.log("Version: " + info.version);
//UpdaterLog.log("Release date: "+ info.releaseDate);
})

autoUpdater.on('update-not-available', () =>{
    UpdaterLog.log("No version available");
    document.getElementById("maintext").innerText = "No version available...";
})

autoUpdater.on('download-progress', (progress) =>{
    UpdaterLog.log(`Progress ${Math.floor(progress.percent)}`);
    document.getElementById("maintext").innerText = `Progress ${Math.floor(progress.percent)}`;
})

autoUpdater.on('update-downloaded', (info) =>{
    UpdaterLog.log("Done");
    document.getElementById("maintext").innerText = "Update downloaded"
    autoUpdater.quitAndInstall();
})

autoUpdater.on('error', (error) =>{
    UpdaterLog.error(error)
    document.getElementById("maintext").innerText = error;
})

electron.app.on('ready', () =>{
    document.getElementById("maintext").innerText = "Ready..."
        autoUpdater.checkForUpdates();
})

}