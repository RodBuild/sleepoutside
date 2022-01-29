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
export function renderListTemplate(template, listElement, list, addDataTemplate) {
  /*if (product.Id == '989CG' | product.Id == '880RT') {
    console.log('no')
  } 
  else {*/
  list.forEach(product => {
    if (product.Id == '989CG' | product.Id == '880RT') {
      console.log('no')
    } else {
      const clone = template.content.cloneNode(true);
      const templateWithData = addDataTemplate(clone, product)
      // insert the actual details of the current product
      listElement.appendChild(templateWithData);
    }
  })
}
