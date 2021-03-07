import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from './components/pages/LandingPage.js';
import LoginPage from './components/pages/LoginPage.js';
import RegisterPage from './components/pages/RegisterPage.js';
import SearchPage from './components/pages/SearchPage.js';
import ErrorPage from './components/pages/ErrorPage.js';
import AdminPage from './components/pages/AdminPage.js';
import UserPage from './components/pages/UserPage.js';
import BookPage from './components/pages/BookPage.js';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route exact path="/login">
                    <LoginPage />
                </Route>
                <Route exact path="/register">
                    <RegisterPage />
                </Route>
                <Route exact path="/search">
                    <SearchPage />
                </Route>
                <Route exact path="/admin">
                    <AdminPage />
                </Route>
                <Route exact path="/user">
                    <UserPage />
                </Route>
                <Route exact path="/book/:id">
                    <BookPage />
                </Route>
                <Route path="*">
                    <ErrorPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
