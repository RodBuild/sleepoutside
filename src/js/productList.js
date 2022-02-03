import { renderListWithTemplate } from "./utils";

export default class ProductList {
    // LIST ELEMENT referers to where the tag <li> where it will be added in HTML
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        // our dataSource will return a promise
        const list = await this.dataSource.getData();
        // render the list
        this.renderList(list)
    }
    renderList(list) {
        // empty list
        this.listElement.innerHTML = '';
        const template = document.getElementById('product-card-template');
        renderListWithTemplate(template,this.listElement,list,this.prepareTemplate);
    }
    // to add the data
    prepareTemplate(template, product) {
        template.querySelector('a').href +=  product.Id;
        template.querySelector('img').src = product.Image;
        template.querySelector('img').alt += product.Name;
        template.querySelector('.card__brand').textContent = product.Brand.Name
        template.querySelector('.card__name').textContent = product.NameWithoutBrand
        template.querySelector('.product-card__price').textContent = product.ListPrice
        return template;
      }
}