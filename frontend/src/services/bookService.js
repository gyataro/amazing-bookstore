import { handleResponse } from '../utils/handleResponse';
import { authHeader } from "../utils/authHeader";
import config from "../config.json";

export const bookService = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    searchByTitle
};

function getBooks() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.API_URL}/book`, requestOptions).then(handleResponse);
}

function getBook(bookId) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.API_URL}/book/${bookId}`, requestOptions).then(handleResponse);
}

function createBook(book) {
    const requestOptions = {
        method: 'POST',
        headers: {'Authorization': authHeader().Authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    };
    return fetch(`${config.API_URL}/book`, requestOptions).then(handleResponse);
}

function updateBook(book, bookId) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Authorization': authHeader().Authorization, 'Content-Type': 'application/json'},
        body: JSON.stringify(book)
    };
    return fetch(`${config.API_URL}/book/${bookId}`, requestOptions).then(handleResponse);
}

function deleteBook(bookId) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    return fetch(`${config.API_URL}/book/${bookId}`, requestOptions).then(handleResponse);
}

function searchByTitle(title) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.API_URL}/book/search?title=${title}`, requestOptions).then(handleResponse);
}