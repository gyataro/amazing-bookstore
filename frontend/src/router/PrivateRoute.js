import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from "../services/authService";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)

/*export default class PrivateRoute extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: true, // Temporary set both to true to bypass
            hasAuthed: true,
        };
    }

    componentDidMount() {
        userService.checkSession(this.checkAuth);
    }

    render() {
        const {component: Component, path="/", exact=false, strict=false} = this.props;

        if (!this.state.hasAuthed) {
            return (
                <Center my={"40vh"}>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Center>
            );
        }

        return (
            <Route path={path} exact={exact} strict={strict} render={props => (
                this.state.isAuthed ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
                )
            )}/>
        );
    }
}*/