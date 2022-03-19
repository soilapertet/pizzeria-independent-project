let currentPizzaSlide = 0;

// Collect all the pizza containers
let pizzaSlides = Array.from(document.querySelectorAll(".pizza-container"));

// Collect all the navigation dots
let navigationDots = Array.from(document.querySelectorAll(".dot"));

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

const resetMenuSection = () => {

  pizzaSlides.forEach((pizzaSlide) => {
    pizzaSlide.classList.remove("active");
  });

  navigationDots.forEach((navDot) => {
    navDot.classList.remove("active");
  });
}


let forwardBtn = document.querySelector(".forward-btn");
  let backBtn = document.querySelector(".back-btn");

  forwardBtn.addEventListener("click", () => {
    changePizzaSlide(currentPizzaSlide + 1);
  });

  backBtn.addEventListener("click", () => {
    changePizzaSlide(currentPizzaSlide - 1);
  });

  navigationDots.forEach((navDot) => {

    let navDotIndex = navigationDots.indexOf(navDot);
    navDot.addEventListener("click", () => {
      if(currentPizzaSlide !== navDotIndex) {
        changePizzaSlide(navDotIndex);
      }
    });
  });

  setInterval(() => {
    
    resetMenuSection(); // remove the class "active" from both the pizza slides and the navigation dots;
    
    if(currentPizzaSlide === pizzaSlides.length) {
      currentPizzaSlide = 0; // Resets the function; loops through the pizza slides
    }

    pizzaSlides[currentPizzaSlide].classList.add("active");
    navigationDots[currentPizzaSlide].classList.add("active");
    ++ currentPizzaSlide;

  }, 2000);