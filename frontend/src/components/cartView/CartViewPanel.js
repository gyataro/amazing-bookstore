import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Box,
    Flex,
    Stack,
    Heading,
    Divider
} from '@chakra-ui/react';
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { cartService } from "../../services/cartService";

export default class CartViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleCounter = this.handleCounter.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            subtotal: 0.00,
            shipping: 0.00,
            currency: "$",
            cart: []
        };
    };

    handleCounter = (updateItem) => {
        cartService.changeItem(updateItem.bookId, updateItem.quantity).then(cart => {
            this.setState({
                cart: cart.cartItems,
                subtotal: cart.total
            });
        })
    }

    handleRemove = (bookId) => {
        cartService.removeItem(bookId).then(cart => {
            this.setState({
                cart: cart.cartItems,
                subtotal: cart.total
            });
        })
    }

    componentDidMount() {
        cartService.getCart().then(cart => {
            this.setState({
                cart: cart.cartItems,
                subtotal: cart.total
            });
        });
    }

    render () {
        return (
            <Flex
                w={{ base: "100%", md: "80%" }}
                direction={{ base: "column-reverse", md: "row" }}
            >
                <Box flex={6} mt={["48px", "0px"]}>
                    { this.state.cart.map(cartItem =>
                        <Box key={cartItem.itemId}>
                            <CartItem
                                onCounter={this.handleCounter}
                                onRemove={this.handleRemove}
                                bookId={cartItem.book.id}
                                bookUrl={cartItem.book.imageUrl}
                                bookTitle={cartItem.book.title}
                                bookPrice={cartItem.book.price}
                                quantity={cartItem.quantity}
                            />
                            <Divider mb={["10px", "28px"]} mt={"10px"} />
                        </Box>
                    )}
                </Box>
                <Box flex={4}>
                    <CartPageCheckout
                        subtotal={ this.state.subtotal }
                        shipping={ this.state.shipping }
                        currency={ this.state.currency }
                    />
                </Box>
            </Flex>
        );
    }
};

function CartPageCheckout(props) {
    return (
        <Box
            w={"100%"}
            borderWidth={"1px"}
            borderRadius={"lg"}
            p={{ base: "28px", md: "28px" }}
        >
            <Stack>
                <Heading mb={"22px"} as={"h4"} size={"lg"}>Cart Summary</Heading>
                <Table mb={{ base: "22px", md: "48px"}}>
                    <Thead>
                        <Tr>
                            <Th><Text fontSize="md">Subject</Text></Th>
                            <Th isNumeric={"true"}><Text fontSize="md">Price</Text></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Subtotal</Td>
                            <Td isNumeric={"true"}>{props.currency}{props.subtotal.toFixed(2)}</Td>
                        </Tr>
                        <Tr>
                            <Td>Shipping</Td>
                            <Td isNumeric={"true"}>{props.currency}{props.shipping.toFixed(2)}</Td>
                        </Tr>
                        <Tr>
                            <Td><Text fontSize="2xl"><b>Total:</b></Text></Td>
                            <Td isNumeric={"true"}>
                                <Text fontSize="2xl">
                                    <b>{props.currency}{(props.shipping + props.subtotal).toFixed(2)}</b>
                                </Text>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>

                { Checkout() }
            </Stack>
        </Box>
    );
}