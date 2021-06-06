import { handleResponse } from '../utils/handleResponse';
import { authHeader } from "../utils/authHeader";
import config from "../config.json";

export const userService = {
    getUsers,
    banUser
};

function getUsers() {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/users`, requestOptions).then(handleResponse);
}

function banUser(userId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Authorization': authHeader().Authorization }
    };
    return fetch(`${config.API_URL}/users/${userId}`, requestOptions).then(handleResponse);
}