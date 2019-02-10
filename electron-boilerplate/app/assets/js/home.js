var open = require("open");
const loggerhome = require('./assets/js/loggerutil.js')('%c[Main Menu]', 'color: #7289da; font-weight: bold');

function OpenLink(url){
    open(url);
}