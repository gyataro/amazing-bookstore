import React from "react";
import { Flex, Box, Heading } from "@chakra-ui/react";
import Header from "../components/general/Header"
import Footer from "../components/general/Footer"
import CartViewPanel from "../components/cartView/CartViewPanel"

export default class CartView extends React.Component {
    render() {
        return (
            <Flex
                display={"flex"}
                direction={"column"}
                align={"center"}
                w={"100%"}
                minWidth={"320px"}
                m={"0 auto"}
            >
                <Header />
                <Box
                    mt={{ base: "120px", md: "20px", xl: "20px"}}
                    mb={{ base: "48px", md: "48px", xl: "48px"}}
                    minH={"75vh"}
                    w={"100%"}
                    align={"center"}
                >
                    <Heading mb={"24px"}>My Cart</Heading>
                    <CartViewPanel />
                </Box>
                <Footer />
            </Flex>
        );
    }
}