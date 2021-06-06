import { handleResponse } from '../utils/handleResponse';
import { authHeader } from "../utils/authHeader";
import config from "../config.json";

export const cartService = {
    getCart,
    addItem,
    changeItem,
    removeItem
};

function getCart() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.API_URL}/cart`, requestOptions).then(handleResponse);
}

function addItem(bookId, quantity) {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': authHeader().Authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify({ bookId, quantity })
    };
    return fetch(`${config.API_URL}/cart/item`, requestOptions).then(handleResponse);
}

function changeItem(bookId, quantity) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Authorization': authHeader().Authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify({ bookId, quantity })
    };
    return fetch(`${config.API_URL}/cart/item`, requestOptions).then(handleResponse);
}

function removeItem(bookId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Authorization': authHeader().Authorization, 'Content-Type': 'application/json'}
    };
    return fetch(`${config.API_URL}/cart/item/${bookId}`, requestOptions).then(handleResponse);
}
