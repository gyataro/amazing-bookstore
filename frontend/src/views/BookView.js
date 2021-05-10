import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import { withRouter } from 'react-router-dom';
import Header from "../components/general/Header"
import Footer from "../components/general/Footer"
import BookViewPanel from "../components/bookView/BookViewPanel"

class BookView extends React.Component {
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
                    <BookViewPanel />
                </Box>
                <Footer />
            </Flex>
        );
    }
}

export default withRouter(BookView);

