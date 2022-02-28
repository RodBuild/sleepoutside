function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error('Bad Response');
  }
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get parameter from URL of the website
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product; //return the parameter??
}

// To render a list of items using template
export function renderListWithTemplate(template, listElement, list, addDataTemplate) {
  /*if (product.Id == '989CG' | product.Id == '880RT') {
    console.log('no')
  } 
  else {*/
  if (!list) {
    console.log('empty')
  } else {
    list.forEach(product => {
      // if we are on home index
      if (!product[0]) {
        if (product.Id == '989CG' | product.Id == '880RT') {
          console.log('no from util.js')
        } else {
          const clone = template.content.cloneNode(true);
          const templateWithData = addDataTemplate(clone, product)
          // insert the actual details of the current product
          listElement.appendChild(templateWithData);
        }
      }
      // if we are on the cart index
      else {
        const clone = template.content.cloneNode(true);
        const templateWithData = addDataTemplate(clone, product)
        // insert the actual details of the current product
        listElement.appendChild(templateWithData);
        // now we insert the quantity
        console.log('utils: ' + product[1])
      }
    })
  }
}

export function renderWithTemplate(template, parent, data, callback) {

  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);

  }
  if (parent != null)
    parent.appendChild(clone);

}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;

}

// load the header and footer
export async function loadHeaderFooter() {
  const header = await loadTemplate('../partials/header.html');
  const footer = await loadTemplate('../partials/footer.html');
  const headerElement = document.getElementById('main-header');
  const footerElement = document.getElementById('main-footer');
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
  // for the icon on top of shopping cart
  const sscript = document.querySelector('.sscript')
  const data = getLocalStorage('so-cart')
  // if localStorage is empty or if it does not exist yet
  if (!data || data.length == 0) {
    sscript.style.visibility = 'hidden'
  }
  // if it exists, we can sum the total quantity of each item
  else {
    var totalQuantity = 0;
    data.forEach(product => {
      console.log(product.quantity)
      totalQuantity += product.quantity;
    })
    // add the totalQuantity to the superScript
    sscript.innerHTML = `${totalQuantity}`
    // animate! :)
    sscript.className += ' bounce'
    // remove animation after 1 secs
    setTimeout(function () {
      sscript.classList.remove('bounce')
    }, 1000);
  }
}

export function alertMessage(message, scroll = true, duration = 5000) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  
  // the X button - to remove alert on click
  alert.addEventListener('click', function(e) {
      if(e.target.tagName == 'SPAN') {
        main.removeChild(this);
      }
  })
  const main = document.querySelector('main');
  // insert at the beginning
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // included animation
  var done = false
  setTimeout(function () {
    alert.classList.add('vanish')
    done = true
    if (done) {
      setTimeout(function() {
        main.removeChild(alert);
      }, 1500)
    }
  }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => document.querySelector('main').removeChild(alert));
}

//breadcrumbs
export async function loadBreadcrumbs() {
  const breadcrumbs = await loadTemplate('../partials/breadcrumbs.html');
  const breadcrumbsElement = document.getElementById('main-breadcrumbs');
  renderWithTemplate(breadcrumbs, breadcrumbsElement)
}
