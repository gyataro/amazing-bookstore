import { handleResponse } from '../utils/handleResponse';
import { authHeader } from "../utils/authHeader";
import config from "../config.json";

export const orderService = {
    addOrder,
    getOrders
};

function addOrder() {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/order`, requestOptions).then(handleResponse);
}

function getOrders() {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/order`, requestOptions).then(handleResponse);
}