import React from "react"
import {
    Flex,
    Box,
    Link,
    Button,
    Heading,
    Text,
    Image,
    Stack,
    Badge
} from '@chakra-ui/react';
import Header from "../sections/Header";

export default function ErrorPage() {
    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
            <Stack align={'center'} spacing={8} mx={'auto'} maxW={'80%'} py={12} px={6}>
                <Heading fontSize={'6xl'}>:(</Heading>
                <Heading fontSize={'4xl'}>
                    Sorry, we couldn't find that page.&nbsp;
                    <Badge variant="subtle" fontSize={"4xl"} colorScheme="red">404</Badge>
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    Go back to <Link color={'blue.400'}>homepage</Link>
                </Text>

            </Stack>
        </Flex>
    );
}