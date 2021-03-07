import React from "react"
import {
    Flex,
    Box,
    Heading,
    Button,
    Stack,
    Image,
    SimpleGrid,
    Divider
} from "@chakra-ui/react"
import {
    Link
} from 'react-router-dom';
import Header from "../sections/Header"
import Footer from "../sections/Footer"
import BookCard from "../sections/BookCard"
import landingstripe from "../../assets/landing-stripe.jpg"

var numbers = [];
for (var i = 1; i <= 6; i++) {
    numbers.push(i);
}
const listItems = numbers.map((number) =>
    <Box mt={16} mx={2} key={number}>
        <BookCard id={number % 2}/>
    </Box>
);

export default function LandingPage(props) {
    return (
        <Flex
            direction={"column"}
            align={"center"}
            w={"100%"}
            minWidth={"320px"}
            m={"0 auto"}
            {...props}
        >
            <Header />

            <Stack
                maxW={"90%"}
                direction={"column"}
                align={"center"}
                mt={{ base: "70px", md: "-30px", xl: "0px"}}
                spacing={"28px"}
            >

                <Image
                    borderRadius={"lg"}
                    display={{ base: "none", xl: "block" }}
                    src={landingstripe}
                />

                <Divider/>

                <Box
                    w={"100%"}
                    direction={"column"}
                    borderWidth={"1px"}
                    borderRadius={"lg"}
                    boxShadow={{ base: 'none', md: 'lg' }}
                    p={{ base: "0px", md: "28px" }}
                    pt={"28px"}
                >
                    <Heading align={"center"}>
                        Bestselling books
                    </Heading>
                    <SimpleGrid columns={{base: 1, md: 3, xl: 6}} spacing={"0px"} justify={"center"} width={"100%"}>
                        {listItems}
                    </SimpleGrid>
                    <Box pt={"28px"} w={"100%"}>
                        <Link to={'/search?q=all'}>
                            <Button
                                variant={"outline"}
                                borderWidth={"2px"}
                                w={"100%"}
                            >
                                Show more >
                            </Button>
                        </Link>
                    </Box>
                </Box>

                <Divider />

                <Box align={"center"} w={"100%"}>
                    <Heading mt={"32px"}>More Categories</Heading>
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        w={"100%"}
                        color={"white"}
                        mt={8}
                        mb={24}
                    >
                        <Box
                            to={'/search?query=mystery'}
                            borderRadius={"lg"}
                            align={"center"}
                            flex={1}
                            bg={"#1A202C"}
                            mr={{ base: 0, md: 2 }}
                            mt={{ base: 1, md: 0 }}
                            pt={8}
                            pb={8}
                        >
                            <Heading as="h3" size="lg">Mystery</Heading>
                        </Box>
                        <Box
                            borderRadius={"lg"}
                            align={"center"}
                            flex={1}
                            bg={"#1A202C"}
                            ml={{ base: 0, md: 2 }}
                            mr={{ base: 0, md: 2 }}
                            mt={{ base: 1, md: 0 }}
                            pt={8}
                            pb={8}
                        >
                            <Heading as={"h3"} size={"lg"}>Fantasy</Heading>
                        </Box>
                        <Box
                            borderRadius={"lg"}
                            align={"center"}
                            flex={1}
                            bg={"#1A202C"}
                            ml={{ base: 0, md: 2 }}
                            mt={{ base: 1, md: 0 }}
                            pt={8}
                            pb={8}
                        >
                            <Heading as={"h3"} size={"lg"} >Romance</Heading>
                        </Box>
                    </Flex>
                </Box>
            </Stack>
            <Footer />
        </Flex>
    );
}
