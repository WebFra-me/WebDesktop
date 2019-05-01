$(document).ready(function() {
  var fs = require('fs');
  //const admzip = require('adm-zip');
  const fse = require('fs-extra');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/Webdesktop/';
  var wd_mdir = wd_home + 'WebDesktop_MyApp/';
  var wd_url_string = window.location.href;
  var wd_url = new URL(wd_url_string);
  var wd_dir = wd_url.searchParams.get("dir");
  var wd_doc = wd_mdir + wd_dir + "/";
  var file = fs.readFileSync(wd_mdir + wd_dir + '/wd.json');
  var obj = JSON.parse(file);
  document.getElementById("bread").innerHTML = '<p><b>Files: <a href="index.html">WebDesktop_MyApp</a> / ' + wd_dir + '/</b></p><p>dat://' + obj.dat + '</p>';
  document.getElementById("dev").innerHTML = '<ul>';
  files = fs.readdirSync(wd_mdir + wd_dir + "/");
  for (i = 0; i < files.length; i++) {
       document.getElementById("dev").innerHTML += '<li><a href="file.html?dir=' + wd_dir + '&file=' + files[i] + '">' + files[i] + '</a></li>';
     }
   document.getElementById("dev").innerHTML += '</ul>';
   $("#wdoc").click(function(){
     shell.openItem(wd_doc);
   });
   $("#newp").click(function(){
     var newp = document.getElementById("page").value;
     var ntemp = document.getElementById("ntem").value;
     if(ntemp == 'html'){
       var cont = '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<he></he>\n\t</head>\n\t<body>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<div class="container">\n\t\t\t\n\t\t</div>\n\t\t<foot></foot>\n\t\t<script>if (typeof module === "object") {window.module = module; module = undefined;}</script>\n\t\t<script src="Plugins/jquery.js"></script>\n\t\t<script src="Plugins/bootstrap.js"></script>\n\t\t<script src="Plugins/vue.js"></script>\n\t\t<script src="Plugins/fontawesome.js"></script>\n\t\t<!--<script src="Plugins/phaser.js"></script>-->\n\t\t<script src="func.js"></script>\n\t\t<script src="' + newp +'.js"></script>\n\t\t<script>if (window.module) module = window.module;</script>\n\t</body>\n</html>';
       fs.writeFile(wd_mdir + wd_dir + "/" + newp + ".html", cont, function (err) {
         if (err) throw err;
         console.log('Replaced!');
       });
       window.location = "file.html?dir=" + wd_dir + "&file=" + newp + ".html";
     }
     else if (ntemp == 'js') {
       var cont = '$(document).ready(function() {\n\t\n});';
       fs.writeFile(wd_mdir + wd_dir + "/" + newp + ".js", cont, function (err) {
         if (err) throw err;
         console.log('Replaced!');
       });
       window.location = "file.html?dir=" + wd_dir + "&file=" + newp + ".js";
     }
     else if (ntemp == 'htmljs') {
       var conthtml = '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<he></he>\n\t</head>\n\t<body>\n\t\t<header></header>\n\t\t<nav></nav>\n\t\t<div class="container">\n\t\t\t\n\t\t</div>\n\t\t<foot></foot>\n\t\t<script>if (typeof module === "object") {window.module = module; module = undefined;}</script>\n\t\t<script src="Plugins/jquery.js"></script>\n\t\t<script src="Plugins/bootstrap.js"></script>\n\t\t<script src="Plugins/vue.js"></script>\n\t\t<script src="Plugins/fontawesome.js"></script>\n\t\t<!--<script src="Plugins/phaser.js"></script>-->\n\t\t<script src="func.js"></script>\n\t\t<script src="' + newp +'.js"></script>\n\t\t<script>if (window.module) module = window.module;</script>\n\t</body>\n</html>';
       fs.writeFile(wd_mdir + wd_dir + "/" + newp + ".html", conthtml, function (err) {
         if (err) throw err;
         console.log('Replaced!');
       });
       var contjs = '$(document).ready(function() {\n\t\n});';
       fs.writeFile(wd_mdir + wd_dir + "/" + newp + ".js", contjs, function (err) {
         if (err) throw err;
         console.log('Replaced!');
       });
       window.location = "file.html?dir=" + wd_dir + "&file=" + newp + ".html";
     }
     else{
       fs.writeFile(wd_mdir + wd_dir + "/" + newp, '', function (err) {
         if (err) throw err;
         console.log('Replaced!');
       });
       window.location = "file.html?dir=" + wd_dir + "&file=" + newp;
     }
   });
   var zip = 1;
   $("#exta").click(function(){
     if(zip == 1){
       if (fse.existsSync(wd_home + 'WebDesktop_alone/')) {
       fse.emptyDir(wd_home + 'WebDesktop_alone/', err => {
  if (err) return console.error(err)

  console.log('success!')
})
}
     }
     var wd_alone = wd_home + 'WebDesktop_alone/';
     if (!fs.existsSync(wd_alone)) {
       fs.mkdirSync(wd_alone);
     }
     /*var wd_mac = wd_home + 'WebDesktop_alone/mac/';
     if (!fs.existsSync(wd_mac)) {
       fs.mkdirSync(wd_mac);
     }*/
     /*try {
       var zip = new admzip(__dirname + '/publish/starter.zip');
       zip.extractAllTo(wd_mac);

     }
     catch (exception) {
       console.error(exception);
     }*/
     /*fs.copyFile(__dirname + '/publish/starter', wd_mac + 'starter', (err) => {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
});*/
if(zip == 1){
     fse.copy(__dirname + '/publish/mac.zip', wd_alone + 'mac.zip');
     fse.copy(__dirname + '/publish/linux.zip', wd_alone + 'linux.zip');
     fse.copy(__dirname + '/publish/windows.zip', wd_alone + 'windows.zip');
     zip += 1;
     alert('Unzip mac.zip, linux.zip, and windows.zip; then press "Create stand alone app" button again to finish your app.');
   }
   else{
     //shell.openItem(wd_mac + 'starter.zip');
     fse.copySync(wd_mdir + wd_dir, wd_alone + 'mac/Electron.app/Contents/Resources/app');
     fse.copySync(wd_mdir + wd_dir, wd_alone + 'linux/resources/app');
     fse.copySync(wd_mdir + wd_dir, wd_alone + 'windows/resources/app');
     /*fse.copy(wd_mdir + wd_dir + "/", wd_mac + 'starter/Electron.app/Contents/Resources/app/', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
    fse.copy(__dirname + '/alone/node_modules/', wd_mac + 'starter/Electron.app/Contents/Resources/app/node_modules/', err => {
       if (err) return console.error(err)
       console.log('success!')
     });*/
     fse.copy(__dirname + '/alone/GPL-3_0.html', wd_alone + 'mac/Electron.app/Contents/Resources/app/GPL-3_0.html', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     fse.copy(__dirname + '/alone/main.js', wd_alone + 'mac/Electron.app/Contents/Resources/app/main.js', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     fse.copy(__dirname + '/alone/mainmenu.js', wd_alone + 'mac/Electron.app/Contents/Resources/app/mainmenu.js', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     fse.copy(__dirname + '/alone/package.json', wd_alone + 'mac/Electron.app/Contents/Resources/app/package.json', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     fse.copy(__dirname + '/alone/GPL-3_0.html', wd_alone + 'linux/resources/app/GPL-3_0.html', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     fse.copy(__dirname + '/alone/main.js', wd_alone + 'linux/resources/app/main.js', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     fse.copy(__dirname + '/alone/mainmenu.js', wd_alone + 'linux/resources/app/mainmenu.js', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     /*fse.copy(__dirname + '/alone/package.json', wd_alone + 'linux/resources/app/package.json', err => {
       if (err) return console.error(err)
       console.log('success!')
     });*/
     var prjs = fs.readFileSync(__dirname + '/alone/package.json');
     prjs = String(prjs);
     var res = prjs.replace(/webdesktop/g, obj.name);
     fs.writeFile(wd_alone + 'linux/resources/app/package.js', res, err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     fse.copy(__dirname + '/alone/GPL-3_0.html', wd_alone + 'windows/resources/app/GPL-3_0.html', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     fse.copy(__dirname + '/alone/main.js', wd_alone + 'windows/resources/app/main.js', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     fse.copy(__dirname + '/alone/mainmenu.js', wd_alone + 'windows/resources/app/mainmenu.js', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     fse.copy(__dirname + '/alone/package.json', wd_alone + 'windows/resources/app/package.json', err => {
       if (err) return console.error(err)
       console.log('success!')
     });
     alert('Your applications have been created at: /Documents/Webdesktop/WebDesktop_alone/');
   }
     shell.openItem(wd_alone);
   });
});
