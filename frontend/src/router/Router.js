import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

import LandingView from '../views/LandingView.js';
import LoginView from '../views/LoginView.js';
import RegisterView from '../views/RegisterView.js';
import ErrorView from '../views/ErrorView.js';
import AdminView from '../views/AdminView.js';
import SearchView from '../views/SearchView.js';
import UserView from '../views/UserView.js';
import BookView from '../views/BookView.js';
import CartView from '../views/CartView.js';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingView}/>
                <Route exact path="/login" component={LoginView}/>
                <Route exact path="/register" component={RegisterView}/>
                <PrivateRoute exact path="/admin" component={AdminView}/>
                <PrivateRoute exact path="/search" component={SearchView}/>
                <PrivateRoute exact path="/user" component={UserView}/>
                <PrivateRoute exact path="/cart" component={CartView}/>
                <PrivateRoute exact path="/book/:id" component={BookView}/>
                <Route path="*" component={ErrorView}/>
            </Switch>
        </BrowserRouter>
    );
};