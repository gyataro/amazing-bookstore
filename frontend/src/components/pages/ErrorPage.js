import React from "react"
import {
    Flex,
    Heading,
    Text,
    Stack,
    Badge,
    Box
} from '@chakra-ui/react';
import {
    Link
} from 'react-router-dom';
import Header from "../sections/Header";

export default function ErrorPage() {
    return (
        <Box minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
            <Header />
            <Flex mt={[8, 8, 40, 40]}>
                <Stack align={'center'} spacing={8} mx={'auto'} maxW={'80%'} py={12} px={6}>
                    <Heading fontSize={'6xl'}>:(</Heading>
                    <Heading fontSize={'4xl'}>
                        Sorry, we couldn't find that page.&nbsp;
                        <Badge variant="subtle" fontSize={"4xl"} colorScheme="red">404</Badge>
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Go back to <Link to={'/'} style={{ color: '#00B5D8' }}>homepage</Link>
                    </Text>

                </Stack>
            </Flex>
        </Box>
    );
}