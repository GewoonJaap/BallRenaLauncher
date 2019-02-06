var request = require('request');
var socket = io('https://ballrenatest.glitch.me/');
socket.on('connect', function(){
  console.log("Connected to master server!");
});
socket.on('UUID', function(data) {
      console.log(data.message);
     var socketinfo = JSON.parse(data.message)
    })
socket.on('event', function(data){});
socket.on('disconnect', function(){
    console.log("Connection lost! Trying to reconnect....")
});
socket.on('callback', function(data){
    var answer = JSON.parse(data.message);
    console.log("Success: " + answer.succes);
})

function Login(){
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    console.log("Password: " + document.getElementById("password").value);
    console.log("Username: " + document.getElementById("username").value);
    console.log("Logging in..........");
    

    var options = {
        method: "GET",
        url: 'https://auth.ballrena.ml/api/g_userinfo.php?apireqkey=BallRena&func=getloginkey&username=' + username + '&password=' + password,
        headers: {
          'User-Agent': 'nodejs request',
        }
      }

      request(options, (error, response, body) => {
          if(!error && response.statusCode == 200){
              var json = JSON.parse(body)
              if(json.login == "success"){
                  console.log("Login: " + json.login)
                  console.log(json.loginreqkey);
              }
              else{
                  console.log("Login: " + json.login);
              }
          }
      })



}
