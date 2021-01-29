import axios from 'axios';

export function sendList(list) {
    return axios.post('http://localhost:3000/api/products/newlist', list)
}

export async function getAllProducts() {
    let products = await axios.get('http://localhost:3000/api/products');
    const settings = await axios.get('http://localhost:3000/api/settings');
    let productswithprices = products.data.map(product =>{
        const priceWithIva = (((product.price * settings.data.iva) / 100) + product.price);
        const myPrice = ((priceWithIva * settings.data.mypercentage) / 100) + priceWithIva;
        return {
            ...product,
            priceWithIva,
            myPrice
        }
    })
    return productswithprices
}