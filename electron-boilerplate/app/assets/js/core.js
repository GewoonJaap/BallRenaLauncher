const {ipcRenderer, remote, shell, webFrame} = require('electron')
const{app, dialog} = require('electron')
const path = require('path')
const loggercore = require('./assets/js/loggerutil.js')('%c[Core]', 'color: #7289da; font-weight: bold');
loggercore.log("Core loaded.")
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

//app.on('open-url', (event, url) => {
  //  console.log("Worked")
//})