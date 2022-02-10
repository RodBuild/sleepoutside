const baseURL = 'http://157.201.228.93:2992/'
function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ProductData {
    constructor() {
        // API means we do not need to specify the category
        //this.category = category;
        //this.path = `../json/${this.category}.json`;
    }

    getData(category) {
        return fetch(baseURL + `products/search/${category}`)
            .then(convertToJson).then((data) => data.Result);
        //return fetch (this.path)
        //    .then(convertToJson).then((data) => data);
    }
    async findProductById(id) {
    //const products = await this.getData()
    //return products.find((item) => item.Id === id);
    // the API allows us to pull products directly from it by ID...so we can change this method as well to take advantage of that.
    return await fetch(baseURL + `product/${id}`).then(convertToJson)
      .then((data) => data.Result);
    }
}