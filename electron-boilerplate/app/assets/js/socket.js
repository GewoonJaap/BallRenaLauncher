
var socket = io('https://ballrenatest.glitch.me/');
socket.on('connect', function(){
  console.log("connected!");
});
socket.on('UUID', function(data) {
      console.log(data.message);
     var socketinfo = JSON.parse(data.message)
    })
socket.on('event', function(data){});
socket.on('disconnect', function(){});

function Login(){
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    console.log("Password: " + document.getElementById("password").value);
    console.log("Username: " + document.getElementById("username").value);
    console.log("Logging in..........");
    document.getElementById("submit").value = "Logging in..........";
    socket.emit('login', { message: '{ "username": "' + username + '","password": "' + password + '"}'});

}
