var request = require('request');
var loginkey;
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

//Get data using https request || UNSAFE!!!!!!!!!!!!!!!!!!!!!!!!!!!!! But we still use it xD

function Login()
{
    var password = document.getElementById("passwordl").value;
    var username = document.getElementById("usernamel").value;
    console.log("Password: " + password);
    console.log("Username: " + username);
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
                  loginkey = json.loginreqkey;
              }
              else{
                  console.log("Login: " + json.login);
              }
          }
      })



}
function ToLogin()
{
    document.getElementById("loginbox").style.visibility = "visible";
    document.getElementById("registerbox").style.visibility = "hidden";
    console.log("Time to login");
}

function ToRegister()
{
    document.getElementById("loginbox").style.visibility = "hidden";
    document.getElementById("registerbox").style.visibility = "visible";
    console.log("Time to register");
}

function Register()
{
    var password = document.getElementById("passwordr").value;
    var username = document.getElementById("usernamer").value;
    var email = document.getElementById("email").value;
    console.log("Registering with:");
    console.log("Email: " + email);
    console.log("Username: " + username);
    console.log("Password:" + password);

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
                  console.log("Login: " + json.login)
                  console.log(json.loginreqkey);
                loginkey = json.loginreqkey;
              }
              else{
                  console.log("Login: " + json.login);
              }
          }
      })

}
