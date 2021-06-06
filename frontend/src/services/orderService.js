import { handleResponse } from '../utils/handleResponse';
import { authHeader } from "../utils/authHeader";
import config from "../config.json";

export const orderService = {
    addOrder,
    getUserOrders,
    searchUserOrdersByDate,
    searchUserOrdersByTitle,
    getOrders,
    searchOrdersByDate,
    searchOrdersByTitle
};

function addOrder() {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/order/user`, requestOptions).then(handleResponse);
}

function getUserOrders() {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/order/user`, requestOptions).then(handleResponse);
}

function searchUserOrdersByDate(from, to) {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/order/user/search?from=${from}&to=${to}`, requestOptions).then(handleResponse);
}

function searchUserOrdersByTitle(title) {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/order/user/search?title=${title}`, requestOptions).then(handleResponse);
}

function getOrders() {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/order/admin`, requestOptions).then(handleResponse);
}

function searchOrdersByDate(from, to) {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/order/admin/search?from=${from}&to=${to}`, requestOptions).then(handleResponse);
}

function searchOrdersByTitle(title) {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/order/admin/search?title=${title}`, requestOptions).then(handleResponse);
}