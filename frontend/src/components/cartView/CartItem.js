import React from "react";
import {
    Box,
    Grid,
    GridItem,
    Image,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Link
} from "@chakra-ui/react"
import Placeholder from "../../assets/placeholder.svg";

export default class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleCounter = this.handleCounter.bind(this);
        this.state = {
            bookId: (props.bookId)? props.bookId : '0',
            bookUrl: (props.bookUrl)? props.bookUrl : Placeholder,
            bookTitle: (props.bookTitle)? props.bookTitle : 'Untitled',
            bookPrice: (props.bookPrice)? props.bookPrice : '1.00',
            quantity: 1,
            currency: '$'
        }
    }

    handleCounter(value) {
        this.setState({quantity: value});
        this.props.onCounter({"id": this.state.bookId, "value": value});
    }


    render() {
        return (
            <Grid
                px={["8px", "0px"]}
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
            >
                <CartItemImage bookUrl={this.state.bookUrl}/>

                <CartItemTitle bookTitle={this.state.bookTitle}/>

                <CartItemCounter onCounter={this.handleCounter} quantity={this.state.quantity}/>

                <CartItemPrice currency={this.state.currency} bookPrice={this.state.bookPrice}/>
            </Grid>
        );
    }
};

function CartItemCounter(props) {
    return (
        <GridItem colSpan={2} align={"left"}>
            <NumberInput
                onChange={props.onCounter}
                size="md"
                w={{ base: "100%", lg: "50%" }}
                defaultValue={props.quantity}
                min={1}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </GridItem>
    );
}

function CartItemImage(props) {
    return (
        <GridItem rowSpan={2} colSpan={1}>
            <Box width={"100px"}>
                <Image src={props.bookUrl} />
            </Box>
        </GridItem>
    );
};

function CartItemTitle(props) {
    return (
        <GridItem colSpan={4} align={"left"} mt={["0px", "18px"]}>
            <Text width={["100%", "85%"]} noOfLines={3} isTruncated>
                {props.bookTitle}
            </Text>
            <Link color={"red"}><b>X</b> Remove</Link>
        </GridItem>
    );
};

function CartItemPrice(props) {
    return (
        <GridItem colSpan={2} mt={"8px"}>
            <Text fontSize="lg">
                <b>{props.currency}{props.bookPrice}</b>
            </Text>
        </GridItem>
    );
};