import React from "react";
import {
    Box,
    Flex,
    Heading,
    Stack,
    Grid,
    GridItem,
    Text,
    Image,
    Divider,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/react";
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa'
import Header from "../sections/Header"
import Footer from "../sections/Footer"
import book from "../../assets/book.jpg";

export default function BookPage(props) {
    return (
        <Flex
            display={"flex"}
            direction={"column"}
            align={"center"}
            w={"100%"}
            minWidth={"320px"}
            m={"0 auto"}
            {...props}
        >
            <Header />

            <Box
                mt={{ base: "120px", md: "20px", xl: "20px"}}
                mb={{ base: "48px", md: "48px", xl: "32px"}}
                minH={"85vh"}
                w={"100%"}
                align={"center"}
            >
                <Box
                    w={{ base: "100%", md: "80%" }}
                    borderWidth={{ base: "0px", md: "1px" }}
                    borderRadius={"lg"}
                    p={{ base: "28px", md: "28px" }}
                >
                    <Grid
                        minH={"500px"}
                        templateColumns="repeat(5, 1fr)"
                        gap={4}
                    >
                        <GridItem pt={{ base: "0px", md: "24px" }} rowSpan={{ base: 1, md: 3 }} colSpan={{ base: 5, md: 1 }} >
                            <Image src={book} width={"100%"}/>
                        </GridItem>

                        <GridItem p={{ base: "0px", md: "24px" }} align={"left"} colSpan={{ base: 5, md: 4 }}>
                            <Heading fontSize={"2xl"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</Heading>
                            <Text>By John Smith</Text>
                            <Divider mt={"20px"} mb={"20px"}/>
                            <Text>Inside these pages Martha shares all her best good
                                things—the original life hacks for the home—to make
                                your life easier, more fun, more delicious, and more
                                efficient. These practical tricks cover all areas
                                of Martha’s domestic expertise, including decorating,
                                organizing, homekeeping, cooking, entertaining,
                                and celebrating. From clever ways to solve common
                                problems (use file folder dividers to organize cutting
                                boards and sheet pans in your cabinets) to time-saving
                                tricks (keep a pail stocked with cleaning supplies for
                                easy access and portability to stress reducers (color-code
                                kids’ bathroom gear to make mornings less hectic), every
                                one of these ideas will make you wonder,
                                “Why didn’t I think of that?” Also included are ways to use
                                what you have (a Parmesan cheese rind will add great flavor
                                to soup), streamline your stuff (use certain kitchen tools for many
                                different purposes), or just make life a little more luxurious
                                (add elegance to your table with DIY place cards). Whether functional,
                                delightful, or a little bit of both, these are the details that enliven
                                and inspire every day—that’s a good thing!</Text>
                        </GridItem>

                        <GridItem
                            mt={{ base: "18px", md: "0px" }}
                            mx={{ base: "-20px", md: "0px" }}
                            colSpan={{ base: 5, md: 4 }}
                        >
                            <Table size={"md"}>
                                <Thead>
                                    <Tr>
                                        <Th>Details</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Stock</Td>
                                        <Td><Badge variant="solid" colorScheme="green">IN STOCK</Badge> (28 left)</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>ISBN-10</Td>
                                        <Td>1328508269</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>ISBN-13</Td>
                                        <Td>978-1328508263</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </GridItem>

                        <GridItem
                            px={"24px"}
                            py={"24px"}
                            mt={"32px"}
                            colSpan={{ base: 5, md: 4 }}
                            borderWidth={"1px"}
                            borderRadius={"xl"}
                        >
                            <Stack direction={{ base: "column", lg: "row" }} spacing={{ base: 4, lg: 8 }} align="center">
                                <Heading>
                                    $10.99
                                </Heading>
                                <NumberInput size="md" w={{ base: "100%", lg: "50%" }} defaultValue={1} min={1}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Button w={{ base: "100%", lg: "100%" }} bgColor="#FBD38D" variant="solid">
                                    <FaShoppingBag />&nbsp;&nbsp;Buy Now
                                </Button>
                                <Button w={{ base: "100%", lg: "100%" }} bgColor="#FF9900" variant="solid">
                                    <FaShoppingCart />&nbsp;&nbsp;Add to Cart
                                </Button>
                            </Stack>
                        </GridItem>
                    </Grid>
                </Box>
            </Box>

            <Footer />
        </Flex>
    );
}