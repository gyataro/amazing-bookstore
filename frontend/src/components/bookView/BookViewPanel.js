import React from "react";
import {
    Badge,
    Box, Button,
    Divider, Grid,
    GridItem,
    Heading,
    Image, NumberDecrementStepper, NumberIncrementStepper,
    NumberInput, NumberInputField, NumberInputStepper, Stack,
    Table, Tbody, Td, Th, Thead, Tr,
    Text,
    useToast
} from "@chakra-ui/react";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import Placeholder from "../../assets/placeholder.svg";

export default class BookViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.addCart = this.addCart.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.state = {
            bookId: (props.bookId)? props.bookId : '0',
            bookImg: (props.bookImg)? props.bookImg : Placeholder,
            bookTitle: (props.bookTitle)? props.bookTitle : 'Untitled',
            bookAuthor: (props.bookAuthor)? props.bookAuthor : 'Author',
            bookDesc: (props.bookDesc)? props.bookDesc : 'No description available',
            bookPrice: (props.bookPrice)? props.bookPrice : '0.00',
            bookStock: (props.bookStock && props.bookStock > 0)? props.bookStock : 0,
            bookIsbn13: (props.bookIsbn13)? props.bookIsbn13 : "N/A",
            bookLang: (props.bookLang)? props.bookLang : "N/A",
            currency: '$'
        }
    }

    addCart() {
        let cartItems = [];
        if (localStorage.getItem('cart')) {
            cartItems = JSON.parse(localStorage.getItem('cart'));
        }

        let itemIndex = cartItems.findIndex(x => x.pid === this.state.bookId);
        if (itemIndex === -1) {
            cartItems.push({'pid': this.state.bookId, 'qty': 1});
        } else {
            cartItems[itemIndex].qty += 1;
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
    };

    addOrder() {
        console.log("Tst");
    };

    render() {
        return (
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
                    <BookViewImage
                        url={this.state.bookImg}
                    />

                    <BookViewInfo
                        title={this.state.bookTitle}
                        author={this.state.bookAuthor}
                        description={this.state.bookDesc}
                    />

                    <BookViewTable
                        stock={this.state.bookStock}
                        isbn13={this.state.bookIsbn13}
                        language={this.state.bookLang}
                    />

                    <BookViewCheckout
                        currency={this.state.currency}
                        price={this.state.bookPrice}
                        onCart={this.addCart}
                        onOrder={this.addOrder}
                    />

                </Grid>
            </Box>
        );
    }
}

function BookViewImage(props) {
    return (
        <GridItem pt={{ base: "0px", md: "24px" }} rowSpan={{ base: 1, md: 3 }} colSpan={{ base: 5, md: 1 }} >
            <Image src={ props.url } width={"100%"}/>
        </GridItem>
    );
}

function BookViewInfo(props) {
    return (
        <GridItem p={{ base: "0px", md: "24px" }} align={"left"} colSpan={{ base: 5, md: 4 }}>
            <Heading fontSize={"2xl"}>{props.title}</Heading>
            <Text>By {props.author}</Text>
            <Divider mt={"20px"} mb={"20px"}/>
            <Text>{props.description}</Text>
        </GridItem>
    );
}

function BookViewTable(props) {
    return (
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
                        <Td>
                            {(props.stock > 0)?
                                <Badge variant="solid" colorScheme="green">IN STOCK</Badge> :
                                <Badge variant="solid" colorScheme="red">OUT OF STOCK</Badge>
                            } ({props.stock} left)
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>Language</Td>
                        <Td>{props.language}</Td>
                    </Tr>
                    <Tr>
                        <Td>ISBN-13</Td>
                        <Td>{props.isbn13}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </GridItem>
    );
}

function BookViewCheckout(props) {
    return (
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
                    {props.currency}{props.price}
                </Heading>
                <Button
                    w={{ base: "100%", lg: "100%" }}
                    bgColor="#FBD38D"
                    variant="solid"
                >
                    <FaShoppingBag />&nbsp;&nbsp;Buy Now
                </Button>
                <Button
                    w={{ base: "100%", lg: "100%" }}
                    bgColor="#FF9900"
                    variant="solid"
                    onClick={props.onCart}
                >
                    <FaShoppingCart />&nbsp;&nbsp;Add to Cart
                </Button>
            </Stack>
        </GridItem>
    );
}