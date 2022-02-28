import ExternalServices from './externalServices.js';
import ProductDetails from './productDetails.js';
import { getParam, loadHeaderFooter, loadBreadcrumbs } from './utils.js';

loadHeaderFooter();
loadBreadcrumbs();

const productId = getParam('product');
const dataSource = new ExternalServices('tents');

const product = new ProductDetails(productId, dataSource);
product.init();
