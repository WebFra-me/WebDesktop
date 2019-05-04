var file = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page');
if( $("he").length ){
  //$("he").load("theme/default/head.wd");
  $("he").load("head.wd");
}
if( $("nav").length ){
  //$("theme").load("theme/default/body.wd");
  $("nav").load("nav.wd");
}
if( $("heading").length ){
  //$("theme").load("theme/default/body.wd");
  $("heading").load("heading.wd");
}
if( $("footer").length ){
  //$("theme").load("theme/default/body.wd");
  $("footer").load("footer.wd");
}
$(document).ready(function(){
  if( $("header").length ){
    //$("theme").load("theme/default/body.wd");
    $("header").load("pages/header.wd");
  }
  if( $("hea").length ){
    //$("theme").load("theme/default/body.wd");
    $("hea").load("pages/head.wd");
  }
  if(file === "" || file === "index.html"){
    if( $("page").length ){
      //$("theme").load("theme/default/body.wd");
      $("page").load("pages/index.wd");
    }
  }
  else if(file === "blog.html"){
    if( $("page").length ){
      //$("theme").load("theme/default/body.wd");
      $("page").load("pages/blog.wd");
    }
  }
  else{
      if(page === null || page === "" || page === "index"){
        window.location.replace("index.html");
      }
      else if(page === "blog"){
        window.location.replace("blog.html");
      }
      else{
        if( $("page").length ){
          //$("theme").load("theme/default/body.wd");
          $("page").load("pages/" + page + ".wd");
        }
      }
  }
  if( $("foot").length ){
    //$("theme").load("theme/default/body.wd");
    $("foot").load("pages/foot.wd");
  }
  if( $("name").length ){
    //$("theme").load("theme/default/body.wd");
    $("name").load("pages/name.wd");
  }
  if( $("title").length ){
    //$("theme").load("theme/default/body.wd");
    $("title").load("pages/name.wd");
  }
  if( $(".navbar-nav").length ){
    $.getJSON("pages/nav.json", function(result){
      $.each(result, function(i, field){
        $(".navbar-nav").append('<li class="nav-item"><a class="nav-link" href="' + field + '">' + i +'</a></li>');
      });
    });
  }
});
