import { handleResponse } from '../utils/handleResponse';
import { authHeader } from "../utils/authHeader";
import config from "../config.json";

export const cartService = {
    getCart,
    addToCart
};

function getCart() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.API_URL}/cart`, requestOptions).then(handleResponse);
}

function addToCart(bookId, quantity) {
    console.log({'Authorization': authHeader().Authorization, 'Content-Type': 'application/json'});
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': authHeader().Authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify({ bookId, quantity })
    };
    return fetch(`${config.API_URL}/cart/add`, requestOptions).then(handleResponse);
}