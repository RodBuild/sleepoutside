function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  // This gets the .JSON of the local storage into cartItems
  const cartItems = getLocalStorage("so-cart");
  // This puts the cartItems into an HTML form
  const htmlItems = renderCartItem(cartItems);
  document.querySelector(".product-list").innerHTML = htmlItems;
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
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
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  console.log(newItem);
  return newItem;
}

getCartContents();
