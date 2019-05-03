$(document).ready(function(){
  $("#login").click(function(){
    var email = $("#email").val();
    email = $.trim(email);
    if(email === 'adam@webdesk.me'){
      //$("#error").html('<p class="text-success">Success: Your email is registered!</p>');
      var pwd = $("#pwd").val();
      pwd = $.trim(pwd);
      if(pwd === 'Hogel'){
        //$("#error").html('<p class="text-success">Success: Your password is correct!</p>');
        if (typeof(Storage) !== "undefined") {
          sessionStorage.login = "yes";
          window.location.href = "desktop.html";
        }
        else {
          $("error").html('<p class="text-danger">Error: Sorry, your browser does not support web storage.</p>');
        }
      }
      else{
        $("#error").html('<p class="text-danger">Error: That password is not correct.</p>');
      }
    }
    else{
      $("#error").html('<p class="text-danger">Error: That email is not registered.</p>');
    }
  });
});
