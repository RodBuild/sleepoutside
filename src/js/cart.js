function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  // IF not NULL, we render cart Items
  if (cartItems !== null) {
  // Render items from local storage (make it HTML). Add rendered htmlItems to a section of the page
  document.querySelector(".product-list").innerHTML = renderCartItem(cartItems)
  // EventListener for Delete Button
  document.querySelector("#removeCart").addEventListener("click", removeCartItem)
  }
  // IF NULL, we show that cart is empty
  else {
    document.querySelector(".product-list").innerHTML =`<li>Your cart is empty!</li>`
  }
  addCartTotal()
}

function removeCartItem() {
  // DELETE local storage called "so-cart"
  localStorage.removeItem("so-cart");
  // UPDATE the cart contents
  getCartContents();
}

function addCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  const element = document.querySelector(".cart-total");
  
  if (cartItems == null) {
    element.innerHTML = ``
  }
  else {
    element.innerHTML += `Total: $${cartItems.FinalPrice}`
  }
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <button id="removeCart" class="cart-card__remove">X</button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  return newItem;
}

getCartContents();
