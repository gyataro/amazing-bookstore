import React from "react";
import {
    Badge,
    Box, Button,
    Divider, Grid,
    GridItem,
    Heading,
    Image,
    Stack,
    Table, Tbody, Td, Th, Thead, Tr,
    Text,
    useToast
} from "@chakra-ui/react";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { bookService } from "../../services/bookService";
import { cartService } from "../../services/cartService";
import { history } from "../../utils/history";

export default class BookViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.addCart = this.addCart.bind(this);
        this.state = {
            isLoading: true,
            book: {
                author: null,
                description: null,
                id: null,
                image_url: null,
                isbn: null,
                language: null,
                price: null,
                sales: null,
                stock: null,
                title: null
            },
            currency: '$'
        }
    }

    componentDidMount() {
        const bookId = window.location.pathname.split('/').pop();
        bookService.getBook(bookId).then(book => {
            this.setState({ book: book, isLoading: false });
        });
    }

    addCart(isCheckout) {
        cartService.addItem(this.state.book.id, 1);
        if(isCheckout) history.push('/cart');
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
                        url={this.state.book.image_url}
                    />

                    <BookViewInfo
                        title={this.state.book.title}
                        author={this.state.book.author}
                        description={this.state.book.description}
                    />

                    <BookViewTable
                        stock={this.state.book.stock}
                        isbn={this.state.book.isbn}
                        language={this.state.book.language}
                    />

                    <BookViewCheckout
                        currency={this.state.currency}
                        price={this.state.book.price}
                        title={this.state.book.title}
                        onCart={this.addCart}
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
                        <Td>{props.isbn}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </GridItem>
    );
}

function BookViewCheckout(props) {
    const toast = useToast();

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
                    onClick={() => props.onCart(true)}
                >
                    <FaShoppingBag />&nbsp;&nbsp;Buy Now
                </Button>
                <Button
                    w={{ base: "100%", lg: "100%" }}
                    bgColor="#FF9900"
                    variant="solid"
                    onClick={() => {
                        props.onCart(false);
                        toast({
                            title: "Book added to cart",
                            description: `We've added ${props.title} for you.`,
                            status: "success",
                            position: "top",
                            duration: 5000,
                            isClosable: true,
                        });
                    }}
                >
                    <FaShoppingCart />&nbsp;&nbsp;Add to Cart
                </Button>
            </Stack>
        </GridItem>
    );
}