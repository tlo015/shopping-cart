//variables for click event listener to:
//add item to cart
var addToCartBtn = document.getElementsByClassName('product-btn');
for (var i=0; i<addToCartBtn.length; i++) {
    var button = addToCartBtn[i];
    button.addEventListener('click', addToCartBtnClick)
};

//change the quantity 
var changeQuantity = document.getElementsByClassName('cart-quantity-input');
for (var i=0; i<changeQuantity.length; i++) {
    var input = changeQuantity[i];
    input.addEventListener('change', changeQtyInput)
};

//remove item from cart 
var removeFromCart = document.getElementsByClassName('remove-btn');
for (var i=0; i<removeFromCart.length; i++) {
    var button = removeFromCart[i];
    button.addEventListener('click', removeFromCartBtn)
};

//checkout the purchase
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
    
function addToCartBtnClick(event) {
    var button = event.target;
    //add the title, price, quantity and remove button of the product-btn clicked
    var productItem = button.parentElement.parentElement;
    var title = productItem.getElementsByClassName('product-title')[0].innerText;
    var price = productItem.getElementsByClassName('product-price')[0].innerText;
        console.log('add to cart', title, price);
    addItemToCart(title, price);
    //update price once the item has been added to the cart 
    updateCartTotal();
}

//create a div in the cart to display the added product
function addItemToCart(title, price) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('in-cart')[0];
    //check to see if the item is already in the cart 
    //loop through all of the item names 
    //check if the item is already in the cart
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i=0; i<cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert ('Item is already in the cart');
            return;
        }
    };
    //template literal backticks to get multi-line string and place variable into the html
    var cartRowContent = `
        <div class="cart-item">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price">${price}</span>
        <div class="cart-quantity">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger remove-btn">Remove</button>
        </div>`
    //test so see if the item html is added
    cartRow.innerHTML = cartRowContent;
    //append the row to the end of the items in the cart 
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changeQtyInput);
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeFromCartBtn);
};
    
function changeQtyInput(event) {
    var input = event.target;
    //check if it a number and if it is negative
    if(isNaN(input.value)|| input.value <= 0) {
        input.value = 1
    }
    updateCartTotal();
}
    
function removeFromCartBtn(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
};

function purchaseClicked() {
    var total = document.getElementsByClassName('total-price')[0].innerText;
    alert(`Do you want to checkout? Your total is ${total}`);
}

//update cart total
function updateCartTotal() {
    var inCart = document.getElementsByClassName('in-cart')[0];
    var cartRow = inCart.getElementsByClassName('cart-row');
    var total = 0;
    //loop over all the items in the cart
    for (var i=0; i<cartRow.length; i++) {
        var selectCartRow = cartRow[i]
        //price and quantiy of each item in the cart
        var priceEl = selectCartRow.getElementsByClassName('cart-price')[0];
        var quantityEl = selectCartRow.getElementsByClassName('cart-quantity-input')[0];
            console.log('updating price', priceEl, quantityEl);
        //remove the $ and convert to number with parse so that numbers can be added together
        var price = parseFloat(priceEl.innerText.replace('$', ''));
            console.log(price);
        var quantity = quantityEl.value;
            console.log(price * quantity);
        total = total + (price * quantity);
    }
    //round to 2dp
    //total = Math.round(total * 100)/100
    total = Math.round(total*100)/100
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}
