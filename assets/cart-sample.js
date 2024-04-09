function removeSample(id){
    $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        dataType: 'json',
        data: {
            'id': id,
            'quantity': 0
            }
        });
};


$(document).ready(function(){
    //get cart and check if sample is in the cart
    $.getJSON('../cart.js', function(cart){
      var items = cart.items;
      if (JSON.stringify(items).includes("42008165122184")) {
        //check price in cart is low and hide sample if yes
        if (cart.total_price < 20000) {
            $(".free").remove();
            removeSample("42008165122184");
        }
        $(".Sample__text").html("Free sample added to cart! :)");
     }
    })
  })

  //add sample on submit
  $('#AddSample').on('submit', function(e) {
    $.ajax({
     type: 'POST',
     url: '/cart/add.js',
     data: $(this).serialize(),
     dataType: 'json'
   });

   } );

   //function check price in cart and is sample in cart
    function checkForFree(){
      //setting delay for 1 sec to get accurate data
      setTimeout(function() {
        //getting cart price
        $.getJSON('../cart.js', function(cart){
          var inCart= JSON.stringify(cart.items).includes("42008165122184");
          //check if price is less than 200 zł
          if (cart.total_price < 20000) {
            let freeSum = Math.abs((cart.total_price - 20000)/100);
            $(".Sample__text").html("Add products for "+freeSum+" zł to get free sample.");
            //remove and hide sample
            if (inCart){
              $(".free").remove();
                removeSample("42008165122184");
            }
          }
          //check if price is right but sample isnt in cart
          else if (cart.total_price > 20000 && !inCart) {
            $(".Sample__text").html('<span> You can add free sample to cart! </span><form method="post" action="/cart/add" id="AddSample"><input type="hidden" name="id" value="42008165122184" /><input min="1" type="hidden" id="quantity" name="quantity" value="1"/><input type="submit" value="Add Sample" class="button button--sample" /></form>');
          }
        });
      }, 1000);
    }

    $('body').on('click', '.quantity__button', function(){
        checkForFree();
      });

    $('body').on('click', 'cart-remove-button', function(){
        checkForFree();
    });
