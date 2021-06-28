import { BehaviorSubject } from "rxjs";
import { handleResponse } from "../utils/handleResponse";
import config from "../config.json";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(username, password) {
    alert(JSON.stringify({ username, password }));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.API_URL}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user.data);

            return user;
        })
        .catch(e => {
            return Promise.reject(e);
        })
}

function register(username, password, confirmPassword, email) {
    alert(JSON.stringify({ username, password, confirmPassword, email }));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, confirmPassword, email })
    };

    return fetch(`${config.API_URL}/auth/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user.data);

            return user;
        })
        .catch(e => {
            return Promise.reject(e);
        })
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}