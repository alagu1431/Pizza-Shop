//Back End
function Order () {
  this.total = [];
  this.cost = 0;
}

function Pizza (size, toppings, selectedToppings) {
  this.selectSize = size;
  this.availableToppings = toppings;
  this.toppingsSelected = selectedToppings;
}

Pizza.prototype.toppingsTotal = function (availableToppings, selectedToppings) {
  for (i = 0; i < this.toppingsSelected.length; i += 1) {
    if (this.toppingsSelected[i].checked) {
      this.availableToppings += 1;
    }
  }
}

Pizza.prototype.pizzaTotal = function (size, toppings) {
  var price = this.selectSize + this.availableToppings;

  console.log(this.selectSize);
  console.log(this.availableToppings);
  return price;

}

function resetSelections() {
  $("select.pizza-size").val("");
  $('input:checkbox').removeAttr('checked');
}

// Front End

$(document).ready(function() {

  $("#add-more-pizza").click(function() {
    $("#pizza-order").append('<p>___________________________________</p>' +
                              '<h2>Sizes</h2>' +
                              '<div id="orderForm">' +
                              '<select class="form-control pizza-size">' +
                               '<option value="6">Small</option>' +
                               '<option value="8">Medium</option>' +
                               '<option value="10">Large</option>' +
                               '</select>' +
                               '<h2>Toppings</h2>' +
                               '<div class="checkbox">' +
                               '<label><input type="checkbox" name="toppings" value="1">pepperoni</label>' +
                               '</div>' +
                               '<div class="checkbox">' +
                               '<label><input type="checkbox" name="toppings" value="1">sausage</label>' +
                               '</div>' +
                               '<div class="checkbox">' +
                               '<label><input type="checkbox" name="toppings" value="1">garlic crust</label>' +
                               '</div>' +
                               '</div>'
    );
  });

  $("#orderForm").submit(function(event) {
    event.preventDefault();

    var zaaOrder = new Order();
    var overallTotal = zaaOrder.cost;


    $(".second-pizza").each(function() {
      var sizeInput = parseInt($(this).find( $("select.pizza-size")).val());

      var toppingInput = 0;

      var ToppingsPicked = $(this).find( document.getElementsByName("toppings"));
      console.log( ToppingsPicked)
      var newPizza = new Pizza(toppingInput, sizeInput, ToppingsPicked);

      zaaOrder.total.push(newPizza);

      newPizza.toppingsTotal();

      var pizzaNumber = zaaOrder.total.indexOf(newPizza);


      $("#show-pizza-results").show();
      $("#pizza-price").append("<li> Pizza " + (pizzaNumber + 1) + ": Rs." + newPizza.pizzaTotal() + "</li>");
      overallTotal = overallTotal + newPizza.pizzaTotal();
    });

    $("#final-total").text("Your Total Order is Rs." + overallTotal);
    resetSelections();

  });
});
