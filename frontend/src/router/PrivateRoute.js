import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spinner, Center } from '@chakra-ui/react';
import * as userService from '../services/userService';

export default class PrivateRoute extends React.Component{
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
}