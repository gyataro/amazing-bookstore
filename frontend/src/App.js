import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from './components/pages/LandingPage.js';
import LoginPage from './components/pages/LoginPage.js';
import RegisterPage from './components/pages/RegisterPage.js';
import ErrorPage from './components/pages/ErrorPage.js';

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
                <Route path="*">
                    <ErrorPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
