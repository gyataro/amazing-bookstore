import { handleResponse } from '../utils/handleResponse';
import { authHeader } from "../utils/authHeader";
import config from "../config.json";

export const statsService = {
    getUsersStats,
    getOrderStats,
    getSalesStats
};

/* [USAGE]: Get users ranked by total books bought */
function getUsersStats(from, to) {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/stats/users?from=${from}&to=${to}`, requestOptions).then(handleResponse);
}

/* [USAGE]: Get a users purchase stats (books bought, amount spent) */
function getOrderStats(from, to) {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/stats/order?from=${from}&to=${to}`, requestOptions).then(handleResponse);
}

/* [USAGE]: Get books ranked by total sales */
function getSalesStats(from, to) {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/stats/sales?from=${from}&to=${to}`, requestOptions).then(handleResponse);
}