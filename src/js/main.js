import ExternalServices from "./externalServices";
import ProductList from "./productList";
import { loadBreadcrumbs, loadHeaderFooter } from './utils.js';

loadHeaderFooter();
loadBreadcrumbs();

const category = 'tents'
const dataSource = new ExternalServices(category);
// This is the <ul> tag on the HTML
const listElement = document.querySelector(".product-list")

const list = new ProductList(category,dataSource,listElement)
list.init()