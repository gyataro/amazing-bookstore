import { handleResponse } from '../utils/handleResponse';
import { authHeader } from "../utils/authHeader";
import config from "../config.json";

export const cartService = {
    getCart,
    getCartById,
    addItem,
    changeItem,
    removeItem
};

function getCart() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.API_URL}/cart`, requestOptions).then(handleResponse);
}

function getCartById(cartId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.API_URL}/cart/${cartId}`, requestOptions).then(handleResponse);
}

function addItem(bookId, quantity) {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': authHeader().Authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify({ bookId, quantity })
    };
    return fetch(`${config.API_URL}/cart/add`, requestOptions).then(handleResponse);
}

function changeItem(bookId, quantity) {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': authHeader().Authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify({ bookId, quantity })
    };
    return fetch(`${config.API_URL}/cart/change`, requestOptions).then(handleResponse);
}

function removeItem(bookId) {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': authHeader().Authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify({ bookId })
    };
    return fetch(`${config.API_URL}/cart/remove`, requestOptions).then(handleResponse);
}
