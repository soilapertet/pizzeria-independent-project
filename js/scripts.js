$(document).ready(function(){
  // Redirect user to another page after hitting "ORDER NOW!"
  $("#order-button").click(function(){
    window.location.href = "order.html";
    return false;
  });
  $("#logo").click(function(){
    window.location.href = "index.html"
  });
})