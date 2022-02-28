import {
  setLocalStorage,
  getLocalStorage,
  alertMessage,
  removeAllAlerts
} from './utils.js';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector('main').innerHTML = this.renderProductDetails();
    // add listener to Add to Cart button
    document.getElementById('addToCart').addEventListener('click', this.addToCart.bind(this));
    // add breadcrumbs
    console.log(this.product.Category)
    const breadcrumbs = document.getElementById('breadcrumb');
    breadcrumbs.innerHTML += `<ul><li><a href="../index.html">Home</a></li>
        <li><a href="../product-listing/index.html?category=${this.product.Category}">${this.product.Category}</a></li>
        <li>${this.product.Brand.Name}</li>
        </ul>`
  }
  addToCart() {
    let cartContents = getLocalStorage('so-cart')
    // If empty, just add the first item
    if (!cartContents) {
      cartContents = [];
      this.product.quantity = 1;
      cartContents.push(this.product);
    }
    // One item already exists
    else {
      let exists = false;
      cartContents.forEach(item => {
        // if the item already exists in the cartContents
        if (item.Id == this.product.Id) {
          item.quantity += 1;
          exists = true;
        }
      })
      // after searching cartContents, we determined that the item does not exist
      if (!exists) {
        this.product.quantity = 1;
        cartContents.push(this.product)
      }
    }
    // add the updated cartContents to the localStorage
    setLocalStorage('so-cart', cartContents)
    // add item to html (sscript) element
    var totalQuantity = 0;
    cartContents.forEach(product => {
      totalQuantity += product.quantity;
    })
    // if the sscript is hidden, make it visible
    const sscript = document.getElementById('sscript')
    sscript.style.visibility = 'visible'
    sscript.innerHTML = totalQuantity
    // two animation
    if (totalQuantity == 1) {
      sscript.className += ' bounce'
      // remove animation after 1 secs
      setTimeout(function () {
        sscript.classList.remove('bounce')
      }, 1000);
    } else {
      const cartIcon = document.querySelector('.cart')
      cartIcon.className += ' shake'
      // remove animation after 1.2 secs
      setTimeout(function () {
        cartIcon.classList.remove('shake')
      }, 1500);
    }
    // create alert - we can just say -> item added
    removeAllAlerts()
    alertMessage(this.product.NameWithoutBrand + ' was added to your cart')
  }
  renderProductDetails() {
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Images.PrimaryLarge}"
          alt="${this.product.NameWithoutBrand}"
        />
        <p class="product-card__price"><b>Price: </b> <strike>$${this.product.SuggestedRetailPrice}</strike> $${this.product.FinalPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div></section>`;
  }
}
