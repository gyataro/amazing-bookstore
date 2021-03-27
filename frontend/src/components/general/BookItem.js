import {
    Box,
    Image,
    Text
} from "@chakra-ui/react"
import {
    Link
} from "react-router-dom"
import bookCardCSS from "../../css/bookcard.module.css"
import Placeholder from "../../assets/placeholder.svg";
import React from "react";

export default class BookItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: (props.bookId)? props.bookId : '0',
            bookImg: (props.bookUrl)? props.bookUrl : Placeholder,
            bookTitle: (props.bookTitle)? props.bookTitle : 'Untitled',
            bookAuthor: (props.bookAuthor)? props.bookAuthor : 'Author',
            bookPrice: (props.bookPrice)? props.bookPrice : '0.00',
            currency: '$'
        }
    }

    render() {
        return (
            <Box
                className={bookCardCSS.card}
                maxW={{ base: "320px", md: "200px" }}
                borderWidth="1px"
                borderColor="rgba(0, 0, 0, 0.0)"
                borderRadius="lg"
                overflow="hidden"
            >
                <BookImage id={this.state.bookId} url={this.state.bookImg} />

                <Box p={"4"}>
                    <BookTitle id={this.state.bookId} title={this.state.bookTitle} />
                    <BookAuthor author={this.state.bookAuthor} />
                    <BookPrice currency={this.state.currency} price={this.state.bookPrice}/>
                </Box>
            </Box>
        );
    }
}

function BookImage(props) {
    return (
        <Link to={"/book/" + props.id}>
            <Box align={"center"}  width={"100%"}>
                <Image src={props.url} className={bookCardCSS.card_image} />
            </Box>
        </Link>
    );
}

function BookTitle(props) {
    return (
        <Link to={"/book/" + props.id}>
            <Box
                minH={"50px"}
                mt="1"
                fontWeight="semibold"
                as="h4"
                className={bookCardCSS.card_title}
            >
                <Text isTruncated noOfLines={2}>
                    {props.title}
                </Text>
            </Box>
        </Link>
    );
}

function BookAuthor(props) {
    return (
        <Box color="gray.600">
            by {props.author}
        </Box>
    );
}

function BookPrice(props) {
    return (
        <Box
            fontWeight="bold"
            fontSize={"2xl"}
        >
            {props.currency}{props.price}
        </Box>
    );
}