import { handleResponse } from '../utils/handleResponse';
import { authHeader } from "../utils/authHeader";
import config from "../config.json";

export const bookService = {
    getBooks,
    getBook
};

function getBooks() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.API_URL}/book`, requestOptions).then(handleResponse);
}

function getBook(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.API_URL}/book/${id}`, requestOptions).then(handleResponse);
}