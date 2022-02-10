import { doc } from 'prettier';
import { renderListWithTemplate, getLocalStorage } from './utils.js';

export default class CartList {
  constructor (key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  async init() {
    
    const list = getLocalStorage(this.key);
    this.renderList(list);
    this.cartTotal(list);
    this.removeCart();
  }
  
  prepareTemplate(template, product) {
    console.log(product)
    template.querySelector('.cart-card__image img').src =  product[0].Images.PrimarySmall;
    template.querySelector('.cart-card__image img').alt += product[0].Name;
    template.querySelector('.card__name').textContent = product[0].Name;
    template.querySelector('.cart-card__color').textContent = product[0].Colors[0].ColorName;
    template.querySelector('.cart-card__quantity').textContent += product[1]
    template.querySelector('.cart-card__remove').textContent += ''
    template.querySelector('.cart-card__price').textContent += product[0].FinalPrice;
    return template;
  }
  
  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = '';
    //get the template
    const template = document.getElementById('cart-card-template');
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
    
  }
  /* ADD TIME TOTAL OF THE ITEMS*/
  // element found at bottom of cart/index.html
  cartTotal(list) {
    const element = document.querySelector(".cart-total");
    //const quantity = document.querySelector(".cart-card__quantity")
    let totalSum = 0
    // if the list does not exist
    if (list == null) {
      element.innerHTML = `Empty Cart!`
    }
    // if it exists, we sum each item's final price
    else {
      list.forEach(product => {
        totalSum += product[0].FinalPrice * product[1]
      })
      // We round and add some extra cash for us :)
      totalSum = Math.round(totalSum) - 0.01
      element.innerHTML = `Final Price: $${totalSum}` 
    }
  }

  removeCart() {
    // console.log('xD')
    // DELETE local storage called "so-cart"
    // EventListener for Delete Button
    //addEventListener("click", removeCartItem())
    document.querySelectorAll(".cart-card__remove").addEventListener("click", function(){
      let e = document.querySelector(".cart-card__price")
      e.innerHTML = `This changed..`
    });
    // gonna return node list -> convert to array easy
    // you want to add a loop to make an array and do for each
    //localStorage.removeItem("so-cart");
    // UPDATE the cart contents
    //getCartContents();
  }

}