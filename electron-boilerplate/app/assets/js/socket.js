var request = require('request');
var emoji = require('node-emoji');
const loggersocket = require('./assets/js/loggerutil.js')('%c[SocketIO]', 'color: #7289da; font-weight: bold');
var loginkey;
var socket = io('https://ballrenatest.glitch.me/');




//EMOJI
//https://www.npmjs.com/package/node-emoji



socket.on('connect', function(){
  loggersocket.log("Connected to master server!");
});
socket.on('UUID', function(data) {
      loggersocket.log(data.message);
     var socketinfo = JSON.parse(data.message)
    })
socket.on('event', function(data){});
socket.on('disconnect', function(){
    loggersocket.log("Connection lost! Trying to reconnect....");
});
socket.on('callback', function(data){
    var answer = JSON.parse(data.message);
    loggersocket.log("Success: " + answer.succes);
})

//Get data using https request || UNSAFE!!!!!!!!!!!!!!!!!!!!!!!!!!!!! But we still use it xD

function Login()
{
    var password = document.getElementById("passwordl").value;
    var username = document.getElementById("usernamel").value;
    loggersocket.log("Password: " + password);
    loggersocket.log("Username: " + username);
    loggersocket.log("Logging in..........");
    

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
                  loggersocket.log("Login: " + json.login)
                  document.getElementById("submit classl").value = "Login" + emoji.get('heavy_check_mark');
                  loggersocket.log(json.loginreqkey);
                  loginkey = json.loginreqkey;
                  window.location.replace(`file://${__dirname}\home.html`);
              }
              else{
                  loggersocket.warn("Login: " + json.login);
                  delay(500);
                  document.getElementById("submit classl").value = "Login" + emoji.get('x');
              }
          }
      })



}
function ToLogin()
{
    document.getElementById("loginbox").style.visibility = "visible";
    document.getElementById("registerbox").style.visibility = "hidden";
    loggersocket.log("Time to login");
}

function ToRegister()
{
    document.getElementById("loginbox").style.visibility = "hidden";
    document.getElementById("registerbox").style.visibility = "visible";
    loggersocket.log("Time to register");
}

function Register()
{
    var password = document.getElementById("passwordr").value;
    var username = document.getElementById("usernamer").value;
    var email = document.getElementById("email").value;

    if(password == "" || username == "" || email == ""){
        document.getElementById("submit classr").value = "Register" + emoji.get('x');
    }
    else{
    loggersocket.log("Registering with:");
    loggersocket.log("Email: " + email);
    loggersocket.log("Username: " + username);
    loggersocket.log("Password:" + password);

    var options = {
        method: "GET",
        url: 'https://auth.ballrena.ml/interface/register.php?email=' + email + '&password=' + password + '&password2=' + password + '&username=' + username,
        headers:{
        'content-type': 'application/x-www-form-urlencoded'
        },
        
      }

      request(options, (error, response, body) => {
          if(!error && response.statusCode == 200){
              var json = JSON.parse(body)
              if(json.login == "success"){
                  loggersocket.log("Register: " + json.login)
                  loggersocket.log(json.loginreqkey);
                loginkey = json.loginreqkey;
                document.getElementById("submit classr").value = "Register" + emoji.get('heavy_check_mark');
              }
              else{
                  loggersocket.debug("Login: " + json.login);
                  document.getElementById("submit classr").value = "Register" + emoji.get('x');
              }
          }
      })
    }

}
function delay(milisecondDelay) {
    milisecondDelay += Date.now();
    while(Date.now() < milisecondDelay){}
 }
 
