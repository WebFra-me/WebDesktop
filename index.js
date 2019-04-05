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
    repo_key = fs.readFileSync(__dirname + "/repo_key.txt");
    if (fs.existsSync(wd_core + '/settings.json')) {
      read_repo = fs.readFileSync(wd_core + '/settings.json');
      var obj = JSON.parse(read_repo);
      obj.rkey = repo_key;
    }
    else{
      var obj = { "rkey":repo_key};
    }
    var rJSON = JSON.stringify(obj)
    fs.writeFile(wd_core + '/settings.json', rJSON, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
    Dat(wd_repos, {
      key: repo_key
    }, function (err, dat) {
      if (err) throw err
      dat.joinNetwork();
    });
  }
document.getElementById("apps").innerHTML = '';
 files = fs.readdirSync(wd_dir);
for (i = 0; i < files.length; i++) {
    if (fs.existsSync(wd_dir + files[i] + '/index.html')) {
      var file = fs.readFileSync(wd_dir + files[i] + '/wd.json');
      var obj = JSON.parse(file);
      var mykey = obj.dat;
      document.getElementById("apps").innerHTML += '<div class="card col-sm-2" data-toggle="tooltip" title="' + obj.des + '"><a href="' + wd_dir + files[i] + '/index.html" target="_blank"><img class="card-img-bottom" src="' + obj.icon + '" alt="' + obj.name + '" style="width:100%"></a><figcaption><a href="' + wd_dir + files[i] + '/index.html" target="_blank">' + obj.name + '</a></figcaption></div>';
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
     document.getElementById("myapps").innerHTML += '<div class="card col-sm-2" data-toggle="tooltip" title="' + obj.des + '"><a href="' + wd_mdir + files[i] + '/index.html" target="_blank"><img class="card-img-bottom" src="' + obj.icon + '" alt="' + obj.name + '" style="width:100%"></a><figcaption><a href="' + wd_dir + files[i] + '/index.html" target="_blank">' + obj.name + '</a></figcaption></div>';
var myfile = files[i];
var mydat = "";
Dat(wd_mdir + files[i], function (err, dat) {
  if (err) throw err
  dat.importFiles();
  dat.joinNetwork();
  console.log('My Dat link is: dat://', dat.key.toString('hex'));
  obj.dat = dat.key.toString('hex');
  var jsonContent = JSON.stringify(obj);
  fs.writeFile(wd_mdir + myfile + '/wd.json', jsonContent, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
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
var con = '<!DOCTYPE html><html><title>Site Map</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><body><h3>Site Map:</h3><ul>';
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
//Server
var server = http.createServer(function (req, res) {
  var pathname = decodeURIComponent(url.parse(req.url).pathname);
  var ext = pathname.split(".");
  var ftype = "html";
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
      }
      else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(wd_www + 'map.html', 'utf8');
        myReadStream.pipe(res);
      }
        break;
      default:
      if(fs.existsSync(wd_www + pathname)){
        if(ftype == "html"){
          res.writeHead(200, {'Content-Type': 'text/html'});
          var myReadStream = fs.createReadStream(wd_www + pathname, 'utf8');
          myReadStream.pipe(res);
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
});
