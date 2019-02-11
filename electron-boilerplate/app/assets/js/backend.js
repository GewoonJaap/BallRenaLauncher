var request = require('request');
const loggerbackend = require('./assets/js/loggerutil.js')('%c[Backend]', 'color: #7289da; font-weight: bold');
const fs = require('fs');
var socket = io('https://ballrena-node-backend.herokuapp.com');

socket.on('connect', function(){
    loggerbackend.log("Connected to master server!");
  });

  socket.on('UUID', function(data) {
    loggerbackend.log(data.message);
   var socketinfo = JSON.parse(data.message)
  })

  socket.on('disconnect', function(){
    loggerbackend.log("Connection lost! Trying to reconnect....");
});