import React from "react"
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    Image
} from '@chakra-ui/react';
import {
    Link
} from 'react-router-dom';
import logo from '../../assets/logo-dark.svg';
import authcover from "../css/authcover.module.css";

export default function LoginPage() {
    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
            <Flex flex={[0, 0, 0, 1]}>
                <div className={authcover.cover_container}>
                    <div className={authcover.cover_left}></div>
                </div>
            </Flex>
            <Flex flex={4}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Box align={'center'}>
                        <Image w={"40%"} src={logo} alt={'logo'} />
                    </Box>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            Shop more than 500,000+ books ️
                        </Text>
                    </Stack>
                    <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Text color={'#00B5D8'}>
                                        <Link>Forgot password?</Link>
                                    </Text>

                                </Stack>
                                <Button
                                    colorScheme={'facebook'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                    <Text align={'center'} fontSize={'lg'} color={'gray.600'}>
                        Don't have an account? <Link to={'/register'} style={{ color: '#00B5D8' }}>Create account</Link>
                    </Text>
                </Stack>
            </Flex>
            <Flex flex={[0, 0, 0, 1]}>
                <div className={authcover.cover_container}>
                    <div className={authcover.cover_right}></div>
                </div>
            </Flex>
        </Flex>
    );
}