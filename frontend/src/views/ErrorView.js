import React from "react"
import {
    Flex,
    Heading,
    Text,
    Stack,
    Badge
} from '@chakra-ui/react';
import {
    Link
} from 'react-router-dom';
import Header from "../components/general/Header";

export default function ErrorView() {
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
        </Flex>
    );
}