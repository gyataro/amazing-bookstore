import React from "react"
import {
    Flex,
    Box,
    Heading,
    Stack,
    Text,
    SimpleGrid
} from "@chakra-ui/react"
import Header from "../sections/Header"
import Footer from "../sections/Footer"
import BookCard from "../sections/BookCard"

var numbers = [];
for (var i = 1; i <= 28; i++) {
    numbers.push(i);
}
const listItems = numbers.map((number) =>
    <Box mt={16} mx={2} key={number}>
        <BookCard id={number % 2}/>
    </Box>
);

export default function SearchPage(props) {
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
                mt={{ base: "120px", md: "-30px", xl: "0px"}}
                pt={"28px"}
                mb={"120px"}
                spacing={"0px"}
            >
                <Box align={"center"}>
                    <Heading>
                        Search Result
                    </Heading>
                    <Text>
                        About 40 books
                    </Text>
                </Box>

                <SimpleGrid columns={{base: 1, md: 3, xl: 6}} spacing={"0px"} justify={"center"} width={"100%"}>
                    {listItems}
                </SimpleGrid>

            </Stack>
            <Footer />
        </Flex>
    );
}