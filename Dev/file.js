$(document).ready(function() {
  var fs = require('fs');
  const {shell} = require('electron');
  const wd_homedir = require('os').homedir();
  var wd_home = wd_homedir + '/Documents/Webdesktop/';
  var wd_mdir = wd_home + 'WebDesktop_MyApp/';
  var wd_url_string = window.location.href;
  var wd_url = new URL(wd_url_string);
  var wd_dir = wd_url.searchParams.get("dir");
  var wd_file = wd_url.searchParams.get("file");
  var wd_doc = wd_mdir + wd_dir + "/" + wd_file;
  $("#unsaved").hide();
  $("#saved").hide();
   $("#wdoc").click(function(){
     shell.openItem(wd_doc);
   });
   $("#mapps").click(function(){
     shell.openItem(wd_mdir);
   });
   document.getElementById("bread").innerHTML = '<p><b>File: <a href="index.html">WebDesktop_MyApp</a> / <a href="files.html?dir=' + wd_dir + '">' + wd_dir + "</a> / " + wd_file + '</b></p>';
   fs.readFile(wd_mdir + wd_dir + "/" + wd_file, {encoding: 'utf-8'}, function(err, data) {
     console.log(data);
  var myCodeMirror = CodeMirror(function(elt) {
  con.parentNode.replaceChild(elt, con);
}, {
    value: data,
    lineNumbers: true,
    mode:  "htmlmixed",
    theme: "abcdef",
    matchBrackets: true,
    matchTags: {bothTags: true},
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
    //lint: true,
    extraKeys: {"Ctrl-Space": "autocomplete",
      "F11": function(cm) {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      },
      "Esc": function(cm) {
        if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
      },
      "Ctrl-J": "toMatchingTag"
    }
  });
  myCodeMirror.on("change", function(cm, change) {
    s = cm.getValue();
    $("#unsaved").show();
    $("#saved").hide();
    $("#savec").click(function(){
      fs.writeFile(wd_mdir + wd_dir + "/" + wd_file, s, function (err) {
      if (err) throw err;
      console.log('Saved!');
      $("#unsaved").hide();
      $("#saved").show();
    });
});
});
});
  });
