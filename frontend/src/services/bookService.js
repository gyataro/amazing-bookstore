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
    const formData = new FormData();
    Object.keys(book).forEach(
        key => (key === "image")? formData.append(key, book[key][0]) : formData.append(key, book[key])
    );

    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': authHeader().Authorization },
        body: formData
    };
    return fetch(`${config.API_URL}/book`, requestOptions).then(handleResponse);
}

function updateBook(book, bookId) {
    console.log(book);
    const formData = new FormData();
    Object.keys(book).forEach(
        key => (key === "image")? null : formData.append(key, book[key])
    );

    if(book["image"].length > 0) {
        formData.append("image", book["image"][0])
    }

    const requestOptions = {
        method: 'PUT',
        headers: {'Authorization': authHeader().Authorization },
        body: formData
    };
    return fetch(`${config.API_URL}/book/${bookId}`, requestOptions).then(handleResponse);
}

function deleteBook(bookId) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    return fetch(`${config.API_URL}/book/${bookId}`, requestOptions).then(handleResponse);
}

function searchByTitle(title, page, size) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.API_URL}/book/search?title=${title}&page=${page}&size=${size}`, requestOptions).then(handleResponse);
}