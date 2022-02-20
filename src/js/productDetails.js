import { setLocalStorage, getLocalStorage, loadHeaderFooter } from './utils.js';

loadHeaderFooter();

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
        document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
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
          cartContents.forEach( item => {
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