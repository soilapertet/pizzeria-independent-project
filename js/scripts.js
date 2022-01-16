// Business logic
var sizeCost,crustCost,toppingsCost; //declare variables

// Create Pizza constructor
function Pizza(type,size,crust,toppings)
{
  this.type = type;
  this.size = size;
  this.crust = crust;
  this.toppings = toppings;
}

// Create a function to store toppings in an array
function getToppings(){
  var pizzaToppings = [];
  $("input[name='toppings']:checked").each(function(){
    pizzaToppings.push($(this).val());
  });
  return pizzaToppings;
};

var smallCost = 50;
var mediumCost = 100;
var largeCost = 150;
var ultraCost = 200;

// Create pre-processed function which will be called in the $(document).ready function
// Create a function to collect the price of the pizza based on the toppings selected
var getToppingsCost = function() {

  var pizzaSize = $("#pizza-size :selected").text();
  var storeToppings = getToppings();

  if(pizzaSize === "Small")
  {
    var toppingsCost = smallCost * storeToppings.length;
  }
  else if(pizzaSize === "Medium")
  {
   var toppingsCost = mediumCost * storeToppings.length;
  }
  else if(pizzaSize === "Large")
  {
    var toppingsCost = largeCost * storeToppings.length;
  }
  else if(pizzaSize === "Ultra")
  {
    var toppingsCost = ultraCost * storeToppings.length;
  }
  else 
  {
    return false;
  }
  return toppingsCost;
}
// Calculate the cost of the pizza
var calculatePizzaCost = function(){

  var sizeCost= parseInt($("select#pizza-size").val());
  var crustCost = parseInt($("select#pizza-crust").val());
  var toppingsCost = getToppingsCost();

  var pizzaCost = sizeCost + crustCost + toppingsCost;
  return pizzaCost;
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

  $("#checkout-button").click(function(){

    event.preventDefault();

    $("#order-section").toggle();
    $("#order-summary").toggle();
    
  // Retrieve input from form
    var pizzaType = $("#pizza-type option:selected").val();
    var pizzaSize = $("#pizza-size option:selected").text();
    var pizzaCrust = $("#pizza-crust option:selected").text();

  // Call and use pre-processed functions and constructors
    var storeToppings = getToppings();
    var pizzaCost = calculatePizzaCost();
    var pizzaOrder = new Pizza(pizzaType,pizzaSize,pizzaCrust,storeToppings);

  // Create a variable to store pizza order
    var row = "<tr><th id='pizzaType'>"+pizzaOrder.type+"</th><th id='pizzaSize'>"+pizzaOrder.size+
              "</th><th id='pizzaCrust'>"+pizzaOrder.crust+"</th><th id='pizzaToppings'>"+pizzaOrder.toppings+
              "</th><th id='pizzaTotal'>"+pizzaCost+"</th><tr>";

     $("tbody#pizzaOrders").append(row);
  });

  $("#add-pizza-button").click(function(){
    
    $("#order-section").toggle();
    $("#order-summary").toggle();

    // Reset form entry fields
    $("select option").prop("selected",false);
    $("input[name='toppings']").prop("checked",false);  

  });
});