import ExternalServices from './ExternalServices.js';
import { alertMessage } from './utils.js';


function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = document.querySelector(outputSelector);
    this.token = null;
    this.services = new ExternalServices();
  }
  async login(creds, next) {
    // request login with credentials
    try {
      this.token = await this.services.loginRequest(creds);
      next();
    } catch (err) {
      alertMessage(err.message.message);
    }
  }
  showLogin() {
    this.mainElement.innerHTML = loginForm();
    document.querySelector('#loginButton').addEventListener('click', (e) => {
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      this.login({email, password}, this.showOrders.bind(this));
    });
  }
  async showOrders() {
    try {
      const orders = await this.services.getOrders(this.token);
      console.log(orders[9].items.forEach(element => console.log(element)))
      this.mainElement.innerHTML = orderHtml();
      const parent = document.querySelector('#orders tbody');
      console.log(orders)
      parent.innerHTML = orders.map(order=>
        `<tr>
          <td>${order.id}</td>
          <td>${new Date(order.orderDate).toLocaleDateString('en-US')}</td>
          <td>${
            //order.items.forEach(e => `<p>${e}<p>`)
            //order.items.forEach(e => e.name)
            order.items.length
          }</td>
          <td>${order.orderTotal}</td>
        </tr>`).join('');
    
    } catch(err) {
      console.log(err);
    }
  }
}

// why do this as functions returning html instead of a template? Both of these are single use. Templates as we have used them make more sense for re-use.
// using a template would be another valid solution for this however...
function loginForm() {
  return `<fieldset class="login-form">
  <legend>Login</legend>
  <p>
    <label for="email">Email</label>
    <input type="text" placeholder="email" id="email" value="user1@email.com"/>
  </p>
  <p>
    <label for="password">Password</label>
    <input type="password" placeholder="password" value="user1" id="password" />
  </p>
  <button type="submit" id="loginButton">Login</button>
</fieldset>`;
}

function orderHtml() {
  return `<h2>Current Orders</h2>
  <table id="orders">
  <thead>
  <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
  </thead>
  <tbody class="order-body"></tbody>
  </table>
  `;
}
