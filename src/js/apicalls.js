import axios from 'axios';
import { calcPercentage } from './helpers';

export function sendList(list, listDate) {
    return axios.post('http://localhost:3000/api/products/newlist', {products : list.products,listDate})
}

export async function getAllProducts() {
    let products = await axios.get('http://localhost:3000/api/products');
    const settings = await axios.get('http://localhost:3000/api/settings');
    let productswithprices = products.data.map(product => {
        const priceWithIva = calcPercentage(product.price, product.iva);
        const myPrice = calcPercentage(priceWithIva, settings.data.mypercentage);
        const codePlus = {      //Usado para iconos en la tabla
            code: product.code,
            new: product.new,
            priceUpdated: product.priceUpdated
        }
        return {
            ...product,
            codePlus,
            priceWithIva,
            myPrice
        }
    })
    return productswithprices
}

export async function getProductById(productid) {
    let { data } = await axios.get('http://localhost:3000/api/products/' + productid);
    const settings = await axios.get('http://localhost:3000/api/settings');
    const priceWithIva = calcPercentage(data.price, data.iva);
    const myPrice = calcPercentage(priceWithIva, settings.data.mypercentage);
    const productwithprices = {
        ...data,
        priceWithIva,
        myPrice
    }
    return productwithprices
}

export async function getHistoricalByProductId(productId) {
    let { data } = await axios.get('http://localhost:3000/api/historical/' + productId);
    return data
}