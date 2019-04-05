$(document).ready(function() {
  var fs = require('fs');
  var Dat = require('dat-node');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/Webdesktop/';
  var wd_dir = wd_home + 'WebDesktop_App/';
  var wd_url_string = window.location.href;
  var wd_url = new URL(wd_url_string);
  var wd_cat = wd_url.searchParams.get("cat");
  var wd_id = wd_url.searchParams.get("id");
  var wd_apps = wd_home + 'WebDesktop_core/WebDesktop_repo/Apps/' + wd_id + '.json';
  var wd_imgs = wd_home + 'WebDesktop_core/WebDesktop_repo/Images/';
  var file = fs.readFileSync(wd_apps);
  var obj = JSON.parse(file);
  var img = __dirname + "/ic.png";
  var key = obj.key;
  var name = obj.name;
  if (fs.existsSync(wd_imgs + obj.key + ".png")) {
    img = wd_imgs + obj.key + ".png";
  }
  $("#bcat").text(wd_cat + ": " + obj.name);
  $("#con").html('<img src="' + img + '" alt="logo image" style="width: 33%;"><h1>' + obj.name + ': <button class="btn btn-success" id="install"><i class="fas fa-cloud-download-alt"></i> Install</button></h1><p>' + obj.des + '</p>');
  $("#install").click(function(){
    Dat(wd_dir + name, {
      key: mykey
    }, function (err, dat) {
      if (err) throw err
      dat.joinNetwork();
    });
    alert("Installed: Please restart WebDesktop to view.");
  });
});
