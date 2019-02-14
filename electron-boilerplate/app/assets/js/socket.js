var request = require('request');
const electron = require('electron');
var emoji = require('node-emoji');
console.log(__dirname)
const loggersocket = require('./assets/js/loggerutil.js')('%c[SocketIO]', 'color: #7289da; font-weight: bold');

//Var
var loginkey;
var username;
var password;
const fs = require('fs');
var socket = io('https://ballrena-node-backend.herokuapp.com');
const BrowserWindow = electron.remote.BrowserWindow;
const Store = require('electron-store');
const store = new Store();


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
function SaveUserPass(){
    store.set('unicorn.username', username);
    store.set('unicorn.password', password);
    console.log(store.get('unicorn.username'));
}

function SaveLoginKey(key){
    loggersocket.log("Saving login key...");
    store.set('unicorn.loginkey', key);
    console.log(store.get('unicorn.loginkey'));
}

if(store.get('unicorn.username') != undefined && store.get('unicorn.password') != undefined)
{
    LoginSaved();
}



//Get data using https request || UNSAFE!!!!!!!!!!!!!!!!!!!!!!!!!!!!! But we still use it xD

function LoginBTN()
{
    store.delete('unicorn.username');
    store.delete('unicorn.password');
    password = document.getElementById("passwordl").value;
    username = document.getElementById("usernamel").value;
    loggersocket.log("Password: " + password);
    loggersocket.log("Username: " + username);
    loggersocket.log("Logging in..........");
    SaveUserPass();
    

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
                  SaveLoginkey();
                  loggersocket.log("Opening main menu....");
                  let win = new BrowserWindow({minWidth: 1280, minHeight: 720, width: 1280, height: 720, frame: false, titleBarStyle: 'hidden', webPreferences: {devTools: true }, backgroundColor: '#2e2c29' , title:"BallRena Launcher" })
                  loggersocket.log("Opening...");
                  win.loadURL(`file://${__dirname}/home.html`);
                  //Close windows
                  var window = remote.getCurrentWindow();
                  window.close();
              }
              else{
                  loggersocket.warn("Login: " + json.login);
                  delay(500);
                  document.getElementById("submit classl").value = "Login" + emoji.get('x');
              }
          }
      })



}
function LoginSaved()
{
    password = store.get('unicorn.password');
    username = store.get('unicorn.username');
    loggersocket.log("Password: " + password);
    loggersocket.log("Username: " + username);
    loggersocket.log("Logging in..........");
    document.getElementById("submit classl").value = "Logging as: " + username;
    

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
                  SaveLoginKey(loginkey);
                  loggersocket.log("Opening main menu....");
                  let win = new BrowserWindow({minWidth: 1280, minHeight: 720, width: 1280, height: 720, frame: false, titleBarStyle: 'hidden', webPreferences: {devTools: true }, backgroundColor: '#2e2c29' , title:"BallRena Launcher" })
                  loggersocket.log("Opening...");
                  win.loadURL(`file://${__dirname}/home.html`);
                  //Close windows
                  var window = electron.remote.getCurrentWindow();
                  window.close();
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
    store.delete('unicorn.username');
    store.delete('unicorn.password');
    password = document.getElementById("passwordr").value;
    username = document.getElementById("usernamer").value;
    var email = document.getElementById("email").value;
    SaveUserPass();

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
                store.set('unicorn.email', email);
                SaveLoginKey();
                document.getElementById("submit classr").value = "Register" + emoji.get('heavy_check_mark');
                loggersocket.log("Opening main menu....");
                let win = new BrowserWindow({minWidth: 1280, minHeight: 720, width: 1280, height: 720, frame: false, titleBarStyle: 'hidden', backgroundColor: '#2e2c29' , title:"BallRena Launcher" })
                loggersocket.log("Opening...");
                win.loadURL(`file://${__dirname}/home.html`);
                //Close windows
                var window = remote.getCurrentWindow();
                window.close();
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
 
