import {
  doc
} from 'prettier';
import {
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage
} from './utils.js';

export default class CartList {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  async init() {

    const list = getLocalStorage(this.key);
    this.renderList(list);
    this.cartTotal(list);
    this.increaseCart(list);
    this.removeCart(list);
  }

  prepareTemplate(template, product) {
    template.querySelector('.cart-card__image img').src = product.Images.PrimarySmall;
    template.querySelector('.cart-card__image img').alt += product.Name;
    template.querySelector('.card__name').textContent = product.Name;
    template.querySelector('.cart-card__color').textContent = product.Colors[0].ColorName;
    template.querySelector('.cart-card__quantity').textContent += product.quantity
    template.querySelector('.cart-card__remove').textContent += ''
    template.querySelector('.cart-card__price').textContent += product.FinalPrice;
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
    //"list-footer hide"
    const sumElement = document.querySelector('.list-total');
    const divElement = document.querySelector('.list-footer');
    const titleElement = document.querySelector('.product-title');
    //const quantity = document.querySelector(".cart-card__quantity")
    let totalSum = 0
    // if the list does not exist
    if (list == null) {
      //element.innerHTML = `Empty Cart!`
      divElement.className += ' hide'
      //change myCart title
      titleElement.innerHTML = `Your Cart is Empty!`
    }
    // if it exists, we sum each item's final price
    else {
      titleElement.innerHTML = `Cart`
      divElement.className = 'list-footer'
      list.forEach(product => {
        totalSum += product.FinalPrice * product.quantity
      })
      // We round and add some extra cash for us :)
      totalSum = Math.round(totalSum) - 0.01
      sumElement.innerHTML += ` ${totalSum}`
      // finally we added to the local-storage
      setLocalStorage('cartTotal', totalSum)
    }
  }

  async increaseCart(list) {
    // select all the + buttons
    const items = document.querySelectorAll('.cart-card__add')
    for (let i = 0; i < items.length; i++) {
      // add eventListener to each item
      items[i].addEventListener('click', await
        function () {
          console.log('Item - > ' + i)
          list[i].quantity += 1;
          console.log(list[i].quantity)
          // set new local storage
          setLocalStorage('so-cart', list);
          // update page?
          location.reload()
        })
    }
  }

  removeCart(list) {
    // select all the - buttons
    const items = document.querySelectorAll('.cart-card__remove')
    for (let i = 0; i < items.length; i++) {
      // add eventListener to each item
      items[i].addEventListener('click', function () {
        console.log('Item -> ' + i)
        // check if the item quantity is 1
        if (list[i].quantity == 1) {
          //remove it from the array
          list.splice(i, 1);
        }
        // else we can just reduce it
        else {
          //cartContents[i].quantity = 
          list[i].quantity = list[i].quantity - 1;
          console.log(list[i].quantity)
        }

        // set the new local storage
        setLocalStorage('so-cart', list);
        // update page?
        location.reload()
      })
    }
    // if all items removed - we DISPLAY EMPTY
    if (list == 0) {
      const divElement = document.querySelector('.list-footer');
      const titleElement = document.querySelector('.product-title');
      //hide the checkout/total section
      divElement.className += ' hide'
      //change myCart title if empty
      titleElement.innerHTML = `Your Cart is Empty!`
    }
  }

} // end of cartList class
