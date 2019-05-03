if (typeof(Storage) !== "undefined") {
  if(sessionStorage.login){
    if(sessionStorage.login !== "yes"){
      window.location.href = "index.html";
    }
  }
  else{
    window.location.href = "index.html";
  }
}
else {
  window.location.href = "index.html";
}
if( $("he").length ){
  $("he").load("theme/default/head.wd");
}
if( $("theme").length ){
  $("theme").load("theme/default/body.wd");
}
$(document).ready(function(){
  if( $("app").length ){
    $("app").load("apps/first/index.wd");
  }
});
