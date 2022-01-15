// Business logic

// Create Pizza constructor
function Pizza(type,size,crust,toppings)
{
  this.type = type;
  this.size = size;
  this.crust = crust;
  this.topppings = toppings;
}
// Create a function to store toopings in an array
function getToppings(){
  window.pizzaToppings = [];
  $("input[name='toppings']:checked").each(function(){
    pizzaToppings.push((this).val());
    return pizzaToppings;
  });
};

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
  {
    return false;
  }
}
// Calculate the cost of the pizza
var calculatePizzaCost = function(){
  window.pizzaCost = sizeCost + crustCost + toppingsCost;
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
  // Create a function to allow user to order more than one pizza
  $("#pizza-button").click(function(){
    $("#order-pizza").append(
      '<br>'+
      '<div class="new-pizza">'+
        '<div class="form-group">'+
          '<label for="pizza-type">Type of pizza</label>'+
            '<br>'+
            '<select class="form-select" name="pizza-type" id="pizza-type">'+
              '<option value="0">--Select type of pizza--</option>'+
              '<option value="1">Classic Veggie</option>'+
              '<option value="2">Meat Lover</option>'+
              '<option value="3">BBQ Chicken</option>'+
              '<option value="4">Pepperoni</option>'+
              '<option value="5">Margherita</option>'+
              '<option value="6">Hawaiian</option>'+
            '</select>'+
        '</div>'+
        '<br>'+
        '<div class="form-group">'+
          '<label for="pizza-size">Size of Pizza</label>'+
            '<p style="text-align: center;"><em>'+
              '(Small: Ksh. 500, Medium: Ksh.750, Large: Ksh. 1000, Ultra: Ksh.1250)'+
            '</em></p>' +
            '<select class="form-select" name="pizza-size" id="pizza-size">'+
              '<option value="0">--Select size of pizza--</option>'+
              '<option value="500">Small</option>'+
              '<option value="750">Medium</option>'+
              '<option value="1000">Large</option>'+
              '<option value="1250">Ultra</option>'+
            '</select>'+
        '</div>'+
        '<br>'+
        '<div class="form-group">'+
          '<label for="pizza-crust">Type of crust</label>'+
            '<p style="text-align: center;"><em>'+
              '(Thin: Ksh. 100, Thick: Ksh.150, Stuffed: Ksh. 200, Gluten-free: Ksh.250)'+
            '</em></p>'+
            '<select class="form-select" name="pizza-crust" id="pizza-crust">'+
              '<option value="0">--Select type of crust--</option>'+
              '<option value="100">Thin crust</option>'+
              '<option value="150">Thick crust</option>'+
              '<option value="200">Stuffed crust</option>'+
              ' <option value="250">Gluten-free crust</option>'+
            '</select>'+
        '</div>'+
        '<br>'+
        '<div class="form-group" id="toppings">'+
          '<label for="toppings">Add Toppings</label>'+
            '<p>'+
              '<em>(Depends on size: Small: Ksh. 50, Medium: Ksh.100, Large: Ksh. 150, Ultra: Ksh.200)</em>'+
            '</p>'+
            '<div class="form-control">'+
            '<br>'+
              '<input type="checkbox" name="toppings" value="Cheese">'+
              '<label for="cheese">Cheese</label>'+
              '<input type="checkbox" name="toppings" value="Bacon">'+
              '<label for="bacon">Bacon</label>'+
              '<input type="checkbox" name="toppings" value="Pineapple">'+
              '<label for="pineapple">Pineapple</label>'+
              '<input type="checkbox" name="toppings" value="Pepperoni">'+
              '<label for="pepperoni">Pepperoni</label>'+
              '<input type="checkbox" name="toppings" value="Chicken">'+
              '<label for="chicken">Chicken</label>'+
              '<input type="checkbox" name="toppings" value="Beef">'+
              '<label for="beef">Beef</label>'+
              '<input type="checkbox" name="toppings" value="Sausage">'+
              '<label for="sausage">Sausage</label>'+
            '</div>'+
        '</div>'+
      '</div>'      
    );
  });
  $("form#order-now").submit(function(event){
    event.preventDefault();

    var pizzaType = $("#pizza-type :selected").val();
    var pizzaSize = $("#pizza-size :selected").text();
    var pizzaCrust = $("#pizza-crust :selected").text();

  });
});