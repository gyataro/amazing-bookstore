import React from "react"
import {
    Flex,
    Heading,
    Text,
    Stack
} from '@chakra-ui/react';
import {
    Link
} from 'react-router-dom';
import Header from "../components/general/Header";

export default function ForbiddenView() {
    return (
        <Flex
            display={"flex"}
            direction={"column"}
            align={"center"}
            w={"100%"}
            minWidth={"320px"}
            minHeight={"100vh"}
            m={"0 auto"}
        >
            <Header />
            <Flex mt={{ base: "220px", md: "120px", xl: "120px"}}>
                <Stack align={'center'} spacing={8} mx={'auto'} maxW={'100%'} py={12} px={6}>
                    <Heading fontSize={'4xl'}>
                        Access Denied
                    </Heading>
                    <Text fontSize={'xl'}>
                        Reason: Not enough permission
                    </Text>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Back to <Link to={'/login'} style={{ color: '#00B5D8' }}>login</Link>
                    </Text>
                </Stack>
            </Flex>
        </Flex>
    );
}