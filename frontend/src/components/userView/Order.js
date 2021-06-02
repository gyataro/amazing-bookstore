import React from "react";
import {
    Grid,
    GridItem,
    Text,
    Stack,
    Box,
    Button,
    IconButton,
    Image
} from "@chakra-ui/react"
import { FaCheckCircle, FaCircle, FaAngleDoubleRight } from "react-icons/fa"
import { cartService } from "../../services/cartService";

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: [],
            order: props.order
        }
    }

    componentDidMount() {
        cartService.getCartById(this.props.order.cartId).then( cart => {
            this.setState({ cartList: cart });
        });
    }

    render() {
        return (
            <Grid
                px={["8px", "0px"]}
                templateColumns="repeat(3, 1fr)"
                gap={4}
            >
                <OrderInfo order={this.state.order}/>
                <OrderDetails cartList={this.state.cartList}/>
            </Grid>
        );
    }
};

function OrderInfo(props) {
    return (
        <GridItem colSpan={1}>
            <Stack direction={"column"} width={"100%"}>
                <Box>
                    <Text align={"left"} color="gray.500">Order Placed # {props.order.cartId.toString()}</Text>
                    <Text align={"left"} fontSize={"lg"} color="gray.800"><b>{new Date(props.order.timestamp).toUTCString()}</b></Text>
                </Box>
                <Box>
                    <Text align={"left"} fontSize={"2xl"}  color="gray.800">{"$" + props.order.subtotal.toString()}</Text>
                </Box>
            </Stack>
        </GridItem>
    );
}

function OrderDetails(props) {
    return (
        <GridItem colSpan={2}>
            <Stack direction="row" spacing={0} borderWidth={"1px"} p={"12px"}>
                <Button leftIcon={<FaCheckCircle />} colorScheme="teal" variant="link">
                    Paid
                </Button>
                <IconButton variant="link" icon={<FaAngleDoubleRight />}></IconButton>
                <Button leftIcon={<FaCircle />} colorScheme="yellow" variant="link">
                    Processed
                </Button>
                <IconButton variant="link" icon={<FaAngleDoubleRight />}></IconButton>
                <Button isDisabled leftIcon={<FaCircle />} colorScheme="gray" variant="link">
                    Shipped
                </Button>
                <IconButton variant="link" icon={<FaAngleDoubleRight />}></IconButton>
                <Button isDisabled leftIcon={<FaCircle />} colorScheme="gray" variant="link">
                    Delivered
                </Button>
            </Stack>
            <Box  borderWidth={"1px"} p={"18px"}>
            { props.cartList.map(book =>
                <Box key={book.bookId} pt={"12px"}>
                    <Grid
                        px={["8px", "0px"]}
                        templateRows="repeat(2, 1fr)"
                        templateColumns="repeat(5, 1fr)"
                        gap={4}
                    >
                        <GridItem rowSpan={2} colSpan={1}>
                            <Box width={"100px"}>
                                <Image src={book.imageUrl} />
                            </Box>
                        </GridItem>
                        <GridItem rowSpan={2} colSpan={4}>
                            <Text align={"left"}><b>{book.title}</b></Text>
                            <Text align={"left"}>Qty: {book.quantity}</Text>
                        </GridItem>
                    </Grid>
                </Box>
            )}
            </Box>
        </GridItem>
    );
}

//layerStyle={props.step > 1 ? "selected" : "base"}
/*
            <List spacing={3} align={"left"} borderWidth={"1px"} p={"12px"}>
                <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    Paid
                </ListItem>
                <ListItem>
                    <ListIcon as={FaCircle} color="yellow.500" />
                    Processed
                </ListItem>
                <ListItem>
                    <ListIcon as={FaCircle} color="gray.500" />
                    Shipped
                </ListItem>
                <ListItem>
                    <ListIcon as={FaCircle} color="gray.500" />
                    Delivered
                </ListItem>
            </List>
*/