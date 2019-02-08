const loggerdisc = require('./assets/js/loggerutil.js')('%c[Discord]', 'color: #7289da; font-weight: bold')

const {Client} = require('discord-rpc')
loggerdisc.log('Unable to initialize Discord Rich Presence, no client detected.')