$(document).ready(function() {
  var fs = require('fs');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/Webdesktop/';
  var wd_url_string = window.location.href;
  var wd_url = new URL(wd_url_string);
  var wd_cat = wd_url.searchParams.get("cat");
  $("#bcat").text(wd_cat);
  var wd_apps = wd_home + 'WebDesktop_core/WebDesktop_repo/Category/' + wd_cat + '.json';
  var wd_imgs = wd_home + 'WebDesktop_core/WebDesktop_repo/Images/';
  if (fs.existsSync(wd_apps)) {
    document.getElementById("con").innerHTML = "";
    var file = fs.readFileSync(wd_apps);
    var obj = JSON.parse(file);
    for (var key in obj){
    if (typeof obj[key] !== 'function') {
      var img = __dirname + "/ic.png";
      if (fs.existsSync(wd_imgs + key + ".png")) {
        img = wd_imgs + key + ".png";
      }
         document.getElementById("con").innerHTML += '<div class="card col-sm-2" data-toggle="tooltip" title="' + obj[key] + '"><a href="app.html?cat=' + wd_cat + '&id=' + key + '"><img class="card-img-bottom" src="' + img + '" alt="' + obj[key] + '" style="width:100%"></a><figcaption><a href="app.html?cat=' + wd_cat + '&id=' + key + '">' + obj[key] + '</a></figcaption></div>';
       }
    }
  }
});
