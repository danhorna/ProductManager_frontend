import axios from 'axios';

export function sendList(list) {
    return axios.post('http://localhost:3000/api/products/newlist', list)
}