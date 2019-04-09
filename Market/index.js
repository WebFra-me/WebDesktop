$(document).ready(function() {
  const {shell} = require('electron');
  var fs = require('fs');
  const fse = require('fs-extra');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/Webdesktop/';
  var wd_dir = wd_home + 'WebDesktop_App/';
  var wd_core = wd_home + 'WebDesktop_core/';
  var wd_repo = wd_core + 'WebDesktop_repo/';
  $("#media").mouseenter(function(){
    $("#media").animate({opacity: '0.4'}, "slow");
    $("#mediat").html('<b style="font-size: 2em; color: #ffffff;">Media</b>');
  });
  $("#media").mouseleave(function(){
    $("#mediat").html('<i class="fas fa-compact-disc" style="font-size: 5em; color: #ffffff;"></i>');
    $("#media").animate({opacity: '1'}, "slow");
  });
  $("#graphics").mouseenter(function(){
    $("#graphics").animate({opacity: '0.4'}, "slow");
    $("#graphicst").html('<b style="font-size: 2em; color: #ffffff;">Graphics</b>');
  });
  $("#graphics").mouseleave(function(){
    $("#graphicst").html('<i class="fas fa-palette" style="font-size: 5em; color: #ffffff;"></i>');
    $("#graphics").animate({opacity: '1'}, "slow");
  });
  $("#office").mouseenter(function(){
    $("#office").animate({opacity: '0.4'}, "slow");
    $("#officet").html('<b style="font-size: 2em; color: #ffffff;">Office</b>');
  });
  $("#office").mouseleave(function(){
    $("#officet").html('<i class="fas fa-building" style="font-size: 5em; color: #ffffff;"></i>');
    $("#office").animate({opacity: '1'}, "slow");
  });
  $("#edu").mouseenter(function(){
    $("#edu").animate({opacity: '0.4'}, "slow");
    $("#edut").html('<b style="font-size: 2em; color: #ffffff;">EDU</b>');
  });
  $("#edu").mouseleave(function(){
    $("#edut").html('<i class="fas fa-graduation-cap" style="font-size: 5em; color: #ffffff;"></i>');
    $("#edu").animate({opacity: '1'}, "slow");
  });
  $("#game").mouseenter(function(){
    $("#game").animate({opacity: '0.4'}, "slow");
    $("#gamet").html('<b style="font-size: 2em; color: #ffffff;">Games</b>');
  });
  $("#game").mouseleave(function(){
    $("#gamet").html('<i class="fas fa-gamepad" style="font-size: 5em; color: #ffffff;"></i>');
    $("#game").animate({opacity: '1'}, "slow");
  });
  $("#utility").mouseenter(function(){
    $("#utility").animate({opacity: '0.4'}, "slow");
    $("#utilityt").html('<b style="font-size: 2em; color: #ffffff;">Utility</b>');
  });
  $("#utility").mouseleave(function(){
    $("#utilityt").html('<i class="fas fa-magic" style="font-size: 5em; color: #ffffff;"></i>');
    $("#utility").animate({opacity: '1'}, "slow");
  });
  $("#prog").mouseenter(function(){
    $("#prog").animate({opacity: '0.4'}, "slow");
    $("#progt").html('<b style="font-size: 2em; color: #ffffff;">Coding</b>');
  });
  $("#prog").mouseleave(function(){
    $("#progt").html('<i class="fas fa-code" style="font-size: 5em; color: #ffffff;"></i>');
    $("#prog").animate({opacity: '1'}, "slow");
  });
  $("#soc").mouseenter(function(){
    $("#soc").animate({opacity: '0.4'}, "slow");
    $("#soct").html('<b style="font-size: 2em; color: #ffffff;">Social</b>');
  });
  $("#soc").mouseleave(function(){
    $("#soct").html('<i class="fas fa-share-alt" style="font-size: 5em; color: #ffffff;"></i>');
    $("#soc").animate({opacity: '1'}, "slow");
  });
  $("#other").mouseenter(function(){
    $("#other").animate({opacity: '0.4'}, "slow");
    $("#othert").html('<b style="font-size: 2em; color: #ffffff;">Other</b>');
  });
  $("#other").mouseleave(function(){
    $("#othert").html('<i class="fas fa-random" style="font-size: 5em; color: #ffffff;"></i>');
    $("#other").animate({opacity: '1'}, "slow");
  });

  $("#media").click(function(){
    window.location.assign("apps.html?cat=Media");
  });
  $("#graphics").click(function(){
    window.location.assign("apps.html?cat=Graphics");
  });
  $("#office").click(function(){
    window.location.assign("apps.html?cat=Office");
  });
  $("#edu").click(function(){
    window.location.assign("apps.html?cat=EDU");
  });
  $("#game").click(function(){
    window.location.assign("apps.html?cat=Games");
  });
  $("#utility").click(function(){
    window.location.assign("apps.html?cat=Utility");
  });
  $("#prog").click(function(){
    window.location.assign("apps.html?cat=Coding");
  });
  $("#soc").click(function(){
    window.location.assign("apps.html?cat=Social");
  });
  $("#other").click(function(){
    window.location.assign("apps.html?cat=Other");
  });
  $("#uninstall").click(function(){
    alert("When the apps folder opens move the folder of the app you no longer want to the trash.");
    shell.openItem(wd_dir);
  });
  $("#sapp").click(function(){
    var mykey = document.getElementById("dkey").value;
    var wd_napp = wd_dir + mykey + '/';
    if (!fs.existsSync(wd_napp)) {
      fs.mkdirSync(wd_napp);
    }
    Dat(wd_napp, {
      key: mykey
    }, function (err, dat) {
      if (err) throw err
      dat.joinNetwork();
    });
    alert("Installed: Please restart WebDesktop to view.");
    $('#napp').modal('toggle');
  });
  if (fs.existsSync(wd_core + 'settings.json')) {
    read_repo = fs.readFileSync(wd_core + 'settings.json');
    var obj = JSON.parse(read_repo);
    var repo_key = obj.key;
  }
  else{
    var repo_key = "No Key is set.";
  }
  $("#orepo").text(repo_key);
  $("#srepo").click(function(){
    if (fs.existsSync(wd_repo)) {
      fse.remove(wd_repo, err => {
        if (err) return console.error(err)
          console.log('Remove success!') // I just deleted my entire HOME directory.
        })
    }
    fs.mkdirSync(wd_repo);
    var mykey = document.getElementById("rdkey").value;
    Dat(wd_repo, {
      key: mykey
    }, function (err, dat) {
      if (err) throw err
      dat.joinNetwork();
    });
    alert("Installed: Please restart WebDesktop to view.");
    $('#erepo').modal('toggle');
  });
});
