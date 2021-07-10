import React from "react";
import {
    Flex,
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    Image
} from '@chakra-ui/react';
import {
    Link
} from 'react-router-dom';
import {
    useForm
} from "react-hook-form";
import logo from '../assets/logo-dark.svg';
import authCoverCSS from '../css/authcover.module.css';
import { authenticationService } from "../services/authService";
import { history } from "../utils/history";

export default function RegisterView() {
    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
            <Flex flex={[0, 0, 0, 1]}>
                <div className={authCoverCSS.cover_container}>
                    <div className={authCoverCSS.cover_left}></div>
                </div>
            </Flex>
            <Flex flex={4}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <RegisterHeader />
                    <RegisterForm />
                    <RegisterFooter />
                </Stack>
            </Flex>
            <Flex flex={[0, 0, 0, 1]}>
                <div className={authCoverCSS.cover_container}>
                    <div className={authCoverCSS.cover_right}></div>
                </div>
            </Flex>
        </Flex>
    );
};

function RegisterHeader(props) {
    return (
        <Box>
            <Box align={'center'}>
                <Image w={"40%"} src={logo} alt={'logo'} />
            </Box>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Create a new account</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    Shop more than 500,000+ books ️
                </Text>
            </Stack>
        </Box>
    );
};

function RegisterForm(props) {
    // Functions to link form input with submission
    const { handleSubmit, setError, errors, register, formState } = useForm();

    function onSubmit(values) {
        return new Promise(resolve => {
            authenticationService.register(
                values.username,
                values.password,
                values.confirmPassword,
                values.email
            ).then(user => {
                history.push("/");
                window.location.reload(true);
            }, e => {
                e.errors.forEach((error, index) => {
                    setError(error.field, {
                        type: "server",
                        message: error.message
                    })
                });
            });
            resolve();
        });
    }

    return (
        <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                    <FormControl id="username" isInvalid={errors.username}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            name="username"
                            type="text"
                            ref={register()}
                        />
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="email" isInvalid={errors.email}>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            ref={register()}
                        />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="password" isInvalid={errors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            ref={register()}
                        />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="confirmPassword" isInvalid={errors.confirmPassword}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            name="confirmPassword"
                            type="password"
                            ref={register()}
                        />
                        <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
                    </FormControl>
                    <Button
                        isLoading={formState.isSubmitting}
                        colorScheme={'facebook'}
                        type={'submit'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Sign Up
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

function RegisterFooter(props) {
    return (
        <Text align={'center'} fontSize={'lg'} color={'gray.600'}>
            Already have an account? <Link to={'/login'} style={{ color: '#00B5D8' }}>Login</Link>
        </Text>
    );
};
