$(document).ready(function() {
  var fs = require('fs');
  var Dat = require('dat-node');
  var http = require('http');
  var url = require('url');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/Webdesktop/';
  if (!fs.existsSync(wd_home)) {
    fs.mkdirSync(wd_home);
  }
  var wd_dir = wd_home + 'WebDesktop_App/';
  if (!fs.existsSync(wd_dir)) {
    fs.mkdirSync(wd_dir);
  }
  var wd_mdir = wd_home + 'WebDesktop_MyApp/';
  if (!fs.existsSync(wd_mdir)) {
    fs.mkdirSync(wd_mdir);
  }
  var wd_doc = wd_home + 'WebDesktop_Docs/';
  if (!fs.existsSync(wd_doc)) {
    fs.mkdirSync(wd_doc);
  }
  var wd_www = wd_home + 'WebDesktop_www/';
  if (!fs.existsSync(wd_www)) {
    fs.mkdirSync(wd_www);
  }
  if (!fs.existsSync(wd_www + 'pages/')) {
    fs.mkdirSync(wd_www + 'pages/');
  }
  if (!fs.existsSync(wd_www + 'themes/')) {
    fs.mkdirSync(wd_www + 'themes/');
  }
  if (!fs.existsSync(wd_www + 'files/')) {
    fs.mkdirSync(wd_www + 'files/');
  }
  if (!fs.existsSync(wd_www + 'logs/')) {
    fs.mkdirSync(wd_www + 'logs/');
  }
  if (!fs.existsSync(wd_www + 'apps/')) {
    fs.mkdirSync(wd_www + 'apps/');
  }
  var wd_core = wd_home + 'WebDesktop_core/';
  if (!fs.existsSync(wd_core)) {
    fs.mkdirSync(wd_core);
  }
  var wd_repos = wd_core + 'WebDesktop_repo/';
  if (!fs.existsSync(wd_repos)) {
    fs.mkdirSync(wd_repos);
    var repo_key = fs.readFileSync(__dirname + "/repo_key.txt");
    console.log("repo_key: " + repo_key);
    if (fs.existsSync(wd_core + 'settings.json')) {
      var read_repo = fs.readFileSync(wd_core + 'settings.json');
      var obj = JSON.parse(read_repo);
      obj.rkey = repo_key;
      var rJSON = JSON.stringify(obj);
    }
    else{
      var rJSON = '{"rkey": "' + repo_key + '"}';
      //var obj = {rkey:repo_key};
      //console.log("obj: " + obj);
    }
    //var rJSON = JSON.stringify(obj);
    console.log("rJSON: " + rJSON);
    fs.writeFile(wd_core + 'settings.json', rJSON, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    Dat(wd_repos, {
      key: repo_key
    }, function (err, dat) {
      if (err) throw err
      console.log('My Dat repo: dat://', dat.key.toString('hex'));
      dat.joinNetwork();
    });
  }
  else{
    var read_repo = fs.readFileSync(wd_core + 'settings.json');
    var obj = JSON.parse(read_repo);
    var repo_key = obj.rkey;
    Dat(wd_repos, {
      key: repo_key
    }, function (err, dat) {
      if (err) throw err
      console.log('My Dat repo: dat://', dat.key.toString('hex'));
      dat.joinNetwork();
    });
    console.log("Repo Dat: " + repo_key);
  }
document.getElementById("apps").innerHTML = '';
 files = fs.readdirSync(wd_dir);
for (i = 0; i < files.length; i++) {
    if (fs.existsSync(wd_dir + files[i] + '/index.html')) {
      var file = fs.readFileSync(wd_dir + files[i] + '/wd.json');
      var obj = JSON.parse(file);
      var mykey = obj.dat;
      document.getElementById("apps").innerHTML += '<div class="card col-sm-2" data-toggle="tooltip" title="' + obj.des + '"><a href="' + wd_dir + files[i] + '/index.html" target="_blank"><img class="card-img-bottom" src="ic.png" alt="' + obj.name + '" style="width:100%"></a><figcaption><a href="' + wd_dir + files[i] + '/index.html" target="_blank">' + obj.name + '</a></figcaption></div>';
Dat(wd_dir + files[i], {
  key: mykey
}, function (err, dat) {
  if (err) throw err
  dat.joinNetwork();
});
    }
}
document.getElementById("myapps").innerHTML = '';
files = fs.readdirSync(wd_mdir);
for (i = 0; i < files.length; i++) {
   if (fs.existsSync(wd_mdir + files[i] + '/index.html')) {
     var file = fs.readFileSync(wd_mdir + files[i] + '/wd.json');
     var obj = JSON.parse(file);
     document.getElementById("myapps").innerHTML += '<div class="card col-sm-2" data-toggle="tooltip" title="' + obj.des + '"><a href="' + wd_mdir + files[i] + '/index.html" target="_blank"><img class="card-img-bottom" src="ic.png" alt="' + obj.name + '" style="width:100%"></a><figcaption><a href="' + wd_dir + files[i] + '/index.html" target="_blank">' + obj.name + '</a></figcaption></div>';
var myfile = files[i];
var mydat = "";
Dat(wd_mdir + files[i], function (err, dat) {
  if (err) throw err
  dat.importFiles();
  //dat.joinNetwork();
  console.log('My Dat link is: dat://', dat.key.toString('hex'));
  obj.dat = dat.key.toString('hex');
  var jsonContent = JSON.stringify(obj);
  fs.writeFile(wd_mdir + myfile + '/wd.json', jsonContent, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  dat.importFiles();
  dat.joinNetwork();
});
   }
}
$("#adir").click(function(){
  shell.openItem(wd_dir);
});
$("#mdir").click(function(){
  shell.openItem(wd_mdir);
});
$("#wdoc").click(function(){
  shell.openItem(wd_home);
});
$("#bwww").click(function(){
  shell.openItem(wd_www + 'files/');
});
var con = '<!DOCTYPE html><html><title>Site Map</title><meta charset="utf-8"><link href="favicon.ico" rel="icon" type="image/x-icon" /><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><body><h3>Site Map:</h3><ul>';
files = fs.readdirSync(wd_www + 'files/');
for (i = 0; i < files.length; i++) {
    if (fs.existsSync(wd_www + 'files/' + files[i])) {
      file = fs.readFileSync(wd_www + 'files/' + files[i]);
      con += '<li><a href="' + encodeURIComponent(files[i]) + '">' + files[i] +'</a></li>';
    }
}
con += '</ul></body></html>';
fs.writeFile(wd_www + 'files/index.html', con, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
document.getElementById("year").innerHTML = new Date().getFullYear();
var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
var alias = 0;

ifaces[ifname].forEach(function (iface) {
if ('IPv4' !== iface.family || iface.internal !== false) {
// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
return;
}
var myIP = "";
if (alias >= 1) {
// this single interface has multiple ipv4 addresses
myIP += '<u><i><a href="#">http://' + iface.address + ':8080</a></i></u>';
} else {
// this interface has only one ipv4 adress
myIP += '<u><i><a href="#">http://' + iface.address + ':8080</a></i></u>';
}
++alias;
document.getElementById("myip").innerHTML = myIP;
$("#myip").click(function(){
  shell.openItem('http://' + iface.address + ':8080');
});
});
//document.getElementById("myip").innerHTML = myIP;
});
$("#wwwe").click(function(){
  location.reload();
});
$("#wwws").click(function(){
  $("#wwwe").show();
  $("#wwws").hide();
//Server
if(fs.existsSync(wd_www + 'favicon.ico')){
  var FAVICON = wd_www + 'favicon.ico';
}
else{
  var FAVICON = __dirname + '/favicon.ico';
}
var d = new Date();
const express = require('express');
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var morgan = require("morgan");
//var rfs = require('rotating-file-stream');
const app = express();
const port = 8080;
/*var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: wd_home + 'logs'
})*/
var accessLogStream = fs.createWriteStream(wd_www + 'logs/access.log', { flags: 'a' });
app.use(morgan('short', { stream: accessLogStream }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(FAVICON));

//app.get('/', (req, res) => res.send('index.html'))
app.use('/', express.static(__dirname + '/public'))
app.use('/themes/', express.static(wd_www + 'themes/'))
app.use('/pages/', express.static(wd_www + 'pages/'))
app.use('/apps/', express.static(wd_www + 'apps/'))
app.use('/files/', express.static(wd_www + 'files/'))
app.post('/',function(req,res){
  var post=req.body;
  //var password=req.body.password;
  //console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});

// Handle 404
  app.use(function(req, res) {
     res.status(404).send('404: Page not Found');
     //res.send('404: Page not Found', 404);
  });

  // Handle 500
  app.use(function(error, req, res, next) {
     res.status(500).send('500: Internal Server Error');
     //res.send('500: Internal Server Error', 500);
  });

app.listen(port, () => console.log(`Listening on port ${port}!`))
//$('[data-toggle="tooltip"]').tooltip();
console.log("WebServer trafic will show up here.");
});
var wd_v = fs.readFileSync(__dirname + '/version.txt', 'utf8');
//var mrobj = JSON.parse(fs.readFileSync(wd_repos + '/repo.json', 'utf8'));
if(fs.existsSync(wd_repos + 'repo.json')){
var mrobj = require(wd_repos + 'repo.json');
console.log("New WebDesktop: " + mrobj.wd_ver);
console.log("Current WebDesktop: " + wd_v);
var wd_nv = mrobj.wd_ver;
var wd_nl = mrobj.wd_link;
if(wd_v != wd_nv){
  $("#wd_update").show();
    //document.getElementById("#wd_update_link").href=mrobj.wd_link;
}
$("#wd_update_link").click(function(){
  window.open(wd_nl, '_blank');
});
};
});
console.log("WebServer trafic will show up here.");
