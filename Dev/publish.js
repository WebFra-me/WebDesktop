$(document).ready(function() {
  var fs = require('fs');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/Webdesktop/';
  var wd_doc = wd_home + 'WebDesktop_Docs/';
  var wd_mdir = wd_home + 'WebDesktop_MyApp/';
  document.getElementById("pub").innerHTML = '<h3>Name: <i>Dat Key</i></h3>';
  files = fs.readdirSync(wd_mdir);
  for (i = 0; i < files.length; i++) {
     if (fs.existsSync(wd_mdir + files[i] + '/index.html')) {
       var file = fs.readFileSync(wd_mdir + files[i] + '/wd.json');
       var obj = JSON.parse(file);
       document.getElementById("pub").innerHTML += '<h4>' + obj.name + ': </h4><p><i>' + obj.dat + '</i></p>';
     }
   }
   $("#wdoc").click(function(){
     shell.openItem(wd_doc);
   });
});
