import ProductData from "./productData";
import ProductList from "./productList";
import { loadHeaderFooter } from './utils.js';

loadHeaderFooter();

const category = 'tents'
const dataSource = new ProductData(category);
// This is the <ul> tag on the HTML
const listElement = document.querySelector(".product-list")

const list = new ProductList(category,dataSource,listElement)
list.init()