import logo from './assets/bookstore_logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from './components/pages/LandingPage.js';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
