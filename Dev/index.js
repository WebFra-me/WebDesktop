$(document).ready(function() {
  var fs = require('fs');
  var Dat = require('dat-node');
  //const admzip = require('adm-zip');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/Webdesktop/';
  var wd_doc = wd_home + 'WebDesktop_Docs/';
  var wd_mdir = wd_home + 'WebDesktop_MyApp/';
  document.getElementById("dev").innerHTML = '<ul>';
  files = fs.readdirSync(wd_mdir);
  for (i = 0; i < files.length; i++) {
     if (fs.existsSync(wd_mdir + files[i] + '/index.html')) {
       var file = fs.readFileSync(wd_mdir + files[i] + '/wd.json');
       var obj = JSON.parse(file);
       document.getElementById("dev").innerHTML += '<li><a href="files.html?dir=' + files[i] + '">' + obj.name + '</a></li>';
     }
   }
   document.getElementById("dev").innerHTML += '</ul>';
   $("#wdoc").click(function(){
     shell.openItem(wd_doc);
   });
   $("#mapps").click(function(){
     shell.openItem(wd_mdir);
   });
   $("#sapp").click(function(){
     var wd = new Object();
    wd["name"] = document.getElementById("title").value;
     wd["des"] = document.getElementById("des").value;
     wd["ver"] = document.getElementById("ver").value;
     wd["auth"] = document.getElementById("auth").value;
     wd["cat"] = document.getElementById("cat").value;
     wd["age"] = document.getElementById("age").value;
     wd["license"] = "GPL-3.0";
    //wd["icon"] = "ic.png";
    var wd_new = wd_mdir + wd["name"] + '/';
    var mydat = "";
    Dat(wd_new, function (err, dat) {
      if (err) throw err
      dat.importFiles();
      dat.joinNetwork();
      console.log('My Dat link is: dat://', dat.key.toString('hex'));
      wd["dat"] = dat.key.toString('hex');
      var jsonContent = JSON.stringify(wd);
      if (!fs.existsSync(wd_new)) {
        fs.mkdirSync(wd_new);
      }
      fs.writeFile(wd_new + 'wd.json', jsonContent, function (err) {
        if (err) throw err;
        console.log('Saved wd.json!');
      });
    });
     var vhtml = '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<he></he>\n\t</head>\n\t<body>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<div class="container">\n\t\t\t\n\t\t</div>\n\t\t<foot></foot>\n\t\t<script>if (typeof module === "object") {window.module = module; module = undefined;}</script>\n\t\t<script src="Plugins/jquery.js"></script>\n\t\t<script src="Plugins/bootstrap.js"></script>\n\t\t<script src="Plugins/vue.js"></script>\n\t\t<script src="Plugins/fontawesome.js"></script>\n\t\t<!--<script src="Plugins/phaser.js"></script>-->\n\t\t<script src="func.js"></script>\n\t\t<script src="index.js"></script>\n\t\t<script>if (window.module) module = window.module;</script>\n\t</body>\n</html>';
     fs.writeFile(wd_new + 'index.html', vhtml, function (err) {
       if (err) throw err;
       console.log('Saved index.html!');
     });
     var vjs = '$(document).ready(function() {\n\t$("#n-home").addClass("active");\n});';
     fs.writeFile(wd_new + 'index.js', vjs, function (err) {
       if (err) throw err;
       console.log('Saved index.js!');
     });
     fs.writeFile(wd_new + 'style.css', "", function (err) {
       if (err) throw err;
       console.log('Saved style.css!');
     });
     var vhe = '\n\t\t<title>' + wd["name"] + '</title>\n\t\t<meta charset="utf-8">\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n\t\t<link rel="stylesheet" href="Plugins/bootstrap.css">\n\t\t<link rel="stylesheet" href="Plugins/fontawesome.css">\n\t\t<link rel="stylesheet" href="style.css">\n\t';
     fs.writeFile(wd_new + 'he.wd', vhe, function (err) {
       if (err) throw err;
       console.log('Saved he.wd!');
     });
     fs.writeFile(wd_new + 'header.wd', "", function (err) {
       if (err) throw err;
       console.log('Saved header.wd!');
     });
     var vnav = '<nav class="navbar navbar-expand-md bg-dark navbar-dark">\n\t<a class="navbar-brand" href="#">' + wd["name"] + '</a>\n\t<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"><span class="navbar-toggler-icon"></span></button>\n\t<div class="collapse navbar-collapse" id="collapsibleNavbar">\n\t\t<ul class="navbar-nav">\n\t\t\t<li id="n-home" class="nav-item"><a class="nav-link" href="#">Home</a></li>\n\t\t</ul>\n\t</div>\n</nav>';
     fs.writeFile(wd_new + 'nav.wd', vnav, function (err) {
       if (err) throw err;
       console.log('Saved nav.wd!');
     });
     fs.writeFile(wd_new + 'foot.wd', '<hr><p>This is a <a href="https://www.webdesk.me" target="_blank">webdesk.me</a> app.</p>', function (err) {
       if (err) throw err;
       console.log('Saved foot.wd!');
     });
     var vfunc = 'if( $("he").length ){\n\t$("he").load("he.wd");\n}\nif( $("header").length ){\n\t$("header").load("header.wd");\n}\nif( $("nav").length ){\n\t$("nav").load("nav.wd");\n}\nif( $("foot").length ){\n\t$("foot").load("foot.wd");\n}\n$(document).ready(function() {\n\t\n});';
     fs.writeFile(wd_new + 'func.js', vfunc, function (err) {
       if (err) throw err;
       console.log('Saved nav.wd!');
     });
     var wd_plugins = wd_new + "Plugins/";
     if (!fs.existsSync(wd_plugins)) {
       fs.mkdirSync(wd_plugins);
     }
     var inStr = fs.createReadStream(__dirname + '/includes/ic.png');
     var outStr = fs.createWriteStream(wd_plugins + 'ic.png');
     var outStr = fs.createWriteStream(wd_new + 'ic.png');
     inStr.pipe(outStr);
     inStr = fs.createReadStream(__dirname + '/includes/jquery.js');
     outStr = fs.createWriteStream(wd_plugins + 'jquery.js');
     inStr.pipe(outStr);
     inStr = fs.createReadStream(__dirname + '/includes/bootstrap.css');
     outStr = fs.createWriteStream(wd_plugins + 'bootstrap.css');
     inStr.pipe(outStr);
     inStr = fs.createReadStream(__dirname + '/includes/bootstrap.js');
     outStr = fs.createWriteStream(wd_plugins + 'bootstrap.js');
     inStr.pipe(outStr);
     inStr = fs.createReadStream(__dirname + '/includes/fontawesome.css');
     outStr = fs.createWriteStream(wd_plugins + 'fontawesome.css');
     inStr.pipe(outStr);
     inStr = fs.createReadStream(__dirname + '/includes/fontawesome.js');
     outStr = fs.createWriteStream(wd_plugins + 'fontawesome.js');
     inStr.pipe(outStr);
     inStr = fs.createReadStream(__dirname + '/includes/phaser.js');
     outStr = fs.createWriteStream(wd_plugins + 'phaser.js');
     inStr.pipe(outStr);
     inStr = fs.createReadStream(__dirname + '/includes/vue.js');
     outStr = fs.createWriteStream(wd_plugins + 'vue.js');
     inStr.pipe(outStr);

     /* try {
       var zip = new admzip(__dirname + '/publish/Electron.zip');
       zip.extractAllTo(wd_plugins);

     }
     catch (exception) {
       console.error(exception);
     }
    fs.writeFile(wd_plugins + 'Electron.app/Contents/Resources/app/test.txt', "Hello World!", function (err) {
       if (err) throw err;
       console.log('Saved an app!');
     }); */
     document.location.href = 'file.html?dir=' + wd["name"] + '&file=index.html';
   });
});
