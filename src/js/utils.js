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
  }
  else {
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
  if(callback) {
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
}
