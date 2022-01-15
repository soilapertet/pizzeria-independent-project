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
    // var sizeCost = parseInt($("select#pizza-size").val());
  });
}

// Create a function to collect the price of the pizza based on the crust
// Note uses of change() and children() functions
var getCrustCost = function() {
  $("select#pizza-crust").change(function(){
    window.crustCost = parseInt($(this).children("option:selected").val());
  });
}

var smallCost = 50;
var mediumCost = 100;
var largeCost = 150;
var ultraCost = 200;

// Create pre-processed function which will be called in the $(document).ready function
// Create a function to collect the price of the pizza based on the toppings selected
var getToppingsCost = function() {
  window.pizzaToppings = [];
  $("input[name='toppings']:checked").each(function(){
    pizzaToppings.push((this).val());
  });

  if(pizzaSize === "Small")
  {
    windows.toppingsCost = smallCost * pizzaToppings.length;
  }
  else if(pizzaSize === "Medium")
  {
    windows.toppingsCost = mediumCost * pizzaToppings.length;
  }
  else if(pizzaSize === "Large")
  {
    windows.toppingsCost = largeCost * pizzaToppings.length;
  }
  else if(pizzaSize === "Ultra")
  {
    windows.toppingsCost = ultraCost * pizzaToppings.length;
  }
  else
    return false;
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