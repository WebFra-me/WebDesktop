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
  shell.openItem(wd_www);
});
var con = '<!DOCTYPE html><html><title>Site Map</title><meta charset="utf-8"><link href="favicon.ico" rel="icon" type="image/x-icon" /><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><body><h3>Site Map:</h3><ul>';
files = fs.readdirSync(wd_www);
for (i = 0; i < files.length; i++) {
    if (fs.existsSync(wd_www + files[i])) {
      file = fs.readFileSync(wd_www + files[i]);
      con += '<li><a href="' + encodeURIComponent(files[i]) + '">' + files[i] +'</a></li>';
    }
}
con += '</ul></body></html>';
fs.writeFile(wd_www + 'map.html', con, function (err) {
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
myIP += '<u><i><a href="http://' + iface.address + ':8080" target="_blank">http://' + iface.address + ':8080</a></i></u>';
} else {
// this interface has only one ipv4 adress
myIP += '<u><i><a href="http://' + iface.address + ':8080" target="_blank">http://' + iface.address + ':8080</a></i></u>';
}
++alias;
document.getElementById("myip").innerHTML = myIP;
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
var server = http.createServer(function (req, res) {
  var pathname = decodeURIComponent(url.parse(req.url).pathname);
  var ext = pathname.split(".");
  var ftype = "html";
  var getClientAddress = req.connection.remoteAddress;
  if(typeof ext[1] !== 'undefined' && ext[1] != 'html'){
    if(ext[1] == 'css'){
      var ftype = "css";
    }
    else if (ext[1] == 'js') {
      var ftype = "js";
    }
    else {
      ftype ="other";
    }
}
    switch (pathname) {
      case '/':
      if(fs.existsSync(wd_www + 'index.html')){
        res.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(wd_www + 'index.html', 'utf8');
        myReadStream.pipe(res);
        console.log(getClientAddress + " - index.html" + ":" + d);
      }
      else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(wd_www + 'map.html', 'utf8');
        myReadStream.pipe(res);
        console.log(getClientAddress + " - map.html" + ":" + d);
      }
        break;
      default:
      if (pathname === '/favicon.ico') {
        res.setHeader('Content-Type', 'image/x-icon');
        fs.createReadStream(FAVICON).pipe(res);
        return;
      }
      else if(fs.existsSync(wd_www + pathname)){
        if(ftype == "html"){
          res.writeHead(200, {'Content-Type': 'text/html'});
          var myReadStream = fs.createReadStream(wd_www + pathname, 'utf8');
          myReadStream.pipe(res);
          console.log(getClientAddress + " - " + pathname + ":" + d);
        }
        else if (ftype == "css") {
          res.writeHead(200, {'Content-Type': 'text/css'});
          var myReadStream = fs.createReadStream(wd_www + pathname, 'utf8');
          myReadStream.pipe(res);
        }
        else if (ftype == "js") {
          res.writeHead(200, {'Content-Type': 'text/javascript'});
          var myReadStream = fs.createReadStream(wd_www + pathname, 'utf8');
          myReadStream.pipe(res);
        }
        else{
          //res.download(wd_www + pathname);
          fs.readFile(wd_www + pathname, function(err, data) {
    res.writeHead(200, {'Content-Type': 'application/octet-stream'}, {'Content-Disposition': 'attachment'});
    res.write(data);
    res.end();
  });
      }
      //var myReadStream = fs.createReadStream(wd_www + pathname, 'utf8');
    }
    else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      var myReadStream = fs.createReadStream(wd_www + 'map.html', 'utf8');
      myReadStream.pipe(res);
    }
    }
    //myReadStream.pipe(res);
}).listen(8080);
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
