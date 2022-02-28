import { alertMessage, loadHeaderFooter, removeAllAlerts } from './utils.js';
import CheckoutProcess from './CheckoutProcess.js';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();

document
  .querySelector('#zip')
  .addEventListener('blur', myCheckout.calculateOrdertotal.bind(myCheckout));
// listening for click on the button
document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status) {
    myCheckout.checkout();
  }
  else {
    console.log('The form is not completed...')
    //remove existing alerts and add new alert
    removeAllAlerts()
    alertMessage('All fields must be completed')
  }
});