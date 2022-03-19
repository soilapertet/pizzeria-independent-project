// Business logic

//Declare variables
var sizeCost,crustCost,toppingsCost,currentCost,totalOrderCost,deliveryCost; 
var pizzaCosts = [];
var totalPizzaCost = 0;
var deliveryCost = 100;
var smallCost = 50;
var mediumCost = 100;
var largeCost = 150;
var ultraCost = 200;
let currentPizzaSlide = 0;

// Collect all the pizza containers
let pizzaSlides = Array.from(document.querySelectorAll(".pizza-container"));

// Collect all the navigation dots
let navigationDots = Array.from(document.querySelectorAll(".dot"));

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

// Create a function to check if field entries have been selected
function checkValidity(){
  if($("#pizza-type").val() === "0"){
    alert("Please select your preferred choice of pizza.");
  }
  else if($("#pizza-size").val() === "0"){
    alert("Please select your preferred size of pizza.");
  }
  else if($("#pizza-crust").val() === "0"){
    alert("Please select your preferred pizza crust.");
  }
  else {
    return false;
  }
  location.reload();
}

//Create a function to create an array of the pizza prices for each order
function returnPizzaCosts(){

  const checkout = document.querySelector('#checkout-button');
  if(checkout){
    checkout.addEventListener('click', (e) => {
        e.preventDefault()
    
        var pizzaCost = calculatePizzaCost();
        var currentCost = pizzaCost;
        pizzaCosts.push(currentCost);
        console.log(pizzaCosts);
        return pizzaCosts;
      },false);
  }
}

returnPizzaCosts();

const changePizzaSlide = (moveTo) => {

  switch(true) {

    // Checks if moveTo is greater or equal to the array length, i.e., 6
    case moveTo >= pizzaSlides.length:
      moveTo = 0; // return to the first pizza slide; resets the function.
      break;
    // Checks if moveTo is a negative number
    case moveTo < 0 :
      moveTo = pizzaSlides.length - 1; // return to the last pizza slide
      break;
  }

  pizzaSlides[currentPizzaSlide].classList.toggle("active"); /** Hides the current pizza slide */
  navigationDots[currentPizzaSlide].classList.toggle("active");
  pizzaSlides[moveTo].classList.toggle("active"); /** Displays the next pizza slide */
  navigationDots[moveTo].classList.toggle("active");

  currentPizzaSlide = moveTo; /** Updates the value for the variable "currentPizzaSlide"*/
}

// User-interface logic

$(document).ready(function(){

  // Redirect user to another page after hitting "ORDER NOW!"
  $("#order-button").click(function(){
    $(location).prop('href', 'order.html')
    return false;
  });
  $("#logo").click(function(){
    $(location).prop('href', 'index.html')
  });


// Checkout button
  $("#checkout-button").click(function(){

    // event.preventDefault();

    checkValidity();
    
    $("#order-summary").slideToggle();
    
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

  // Scroll to the id="order-summary"
  // Note use of offset() and animate() functions
    var summaryPosition = $('#order-summary').offset().top;
    $("HTML,BODY").animate({scrollTop:summaryPosition},400,function(){
   
      window.location.summaryPosition = summaryPosition;
    });
  });

// Add pizza button
  $("#add-pizza-button").click(function(){

    $("#order-summary").slideToggle();

    // Reset form entry fields
    $("select option").prop("selected",false);
    $("input[name='toppings']").prop("checked",false);  

    // Scroll to the top of id="order-section"
    var orderPosition = $('#order-section').offset().top;
    $("HTML,BODY").animate({scrollTop:orderPosition},100,function(){
   
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.orderPosition = orderPosition;
    });

  });
// Done button
  $("#done-button").click(function(){

    $("#order-summary").slideToggle(800);
    $("#order-section").slideUp(800);
    $("#delivery").slideDown();

    var deliveryPosition = $("#delivery").offset().top;
    $("HTML,BODY").animate({scrollTop:deliveryPosition},400,function(){
   
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.deliveryPosition = deliveryPosition;
    });
  });

// Delivery button
  $("#delivery-button").click(function(){

    $("#proceed-button").show();
    
    for(let i = 0;i < pizzaCosts.length; i++) {
      totalPizzaCost +=  pizzaCosts[i];
      console.log(totalPizzaCost);
    }

    var totalOrderCost = deliveryCost + totalPizzaCost;

    $("p#delivery-cost").text("Delivery cost: " + "Ksh. " + 100);
    $("p#cumultative-cost").text("Total pizza cost: " + "Ksh. " + totalPizzaCost);
    $("p#total-cost").text("Final Total: " + "Ksh. " + totalOrderCost);

    //Confirm button
    $("#confirm-button").click(function(){

      $("#address-info").toggle();
    
      event.preventDefault();
    
        var userName = $("input#name").val();
        var userNumber = $("input#phone-number").val();
        var userAddress = $("input#address").val();
        var totalOrderCost = deliveryCost + totalPizzaCost;
    
        $("#delivery-message").text(
          "THANK YOU " + userName + " FOR ORDERING WITH US! This is to confirm that we've received your order and that your delivery address is "+
           userAddress + "." + " In case of any issue, we'll reach out to you through the provided number: "+ userNumber + ". " +
           "Please pay Ksh. " + totalOrderCost + " upon delivery."
        );
    });
  });

  // Proceed button
  $("#proceed-button").click(function(){

    $("#address-info").toggle();

  });

  // Pick-up button
  $("#pick-up-button").click(function(){

    $("#proceed-button").show();

    for(let i = 0;i < pizzaCosts.length; i++) {
      totalPizzaCost +=  pizzaCosts[i];
      console.log(totalPizzaCost);
    }

    var totalOrderCost =  totalPizzaCost;

    $("p#delivery-cost").hide();
    $("p#cumultative-cost").hide()
    $("p#total-cost").text("Final Total: " + "Ksh. " + totalOrderCost);

    // Confirm button
    $("#confirm-button").click(function(){

      $("#address-info").toggle();
    
      event.preventDefault();
    
        var userName = $("input#name").val();
        var userNumber = $("input#phone-number").val();
        var userAddress = $("input#address").val();
        var totalOrderCost = totalPizzaCost;
    
        $("#delivery-message").text(
          "THANK YOU " + userName + " FOR ORDERING WITH US! This is to confirm that we've received your order and that your order is processed"+
          "." + "Your order will be ready in the next 35-45 minutes. Your patience is highly appreciated. Once your order is ready, we'll send our address to the provided number: "+ userNumber + ". " +
           "Please pay Ksh. " + totalOrderCost + " at the cashier upon arrving at the premises."
        );
    });
  });

  let forwardBtn = document.querySelector(".forward-btn");
  let backBtn = document.querySelector(".back-btn");

  forwardBtn.addEventListener("click", () => {
    changePizzaSlide(currentPizzaSlide + 1);
  });

  backBtn.addEventListener("click", () => {
    changePizzaSlide(currentPizzaSlide - 1);
  });
});