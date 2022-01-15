// Business logic

// Create Pizza constructor
function Pizza(type,size,crust,toppings)
{
  this.type = type;
  this.size = size;
  this.crust = crust;
  this.topppings = toppings;
}

// Create a function to collect the price of the pizza based on the size
// Note uses of change() and children() functions
var getSizeCost = function (){
  $("select#pizza-size").change(function() {
    window.sizeCost = parseInt($(this).children("option:selected").val());
  });
}


// User-interface logic

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