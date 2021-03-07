import {
    Box,
    Image
} from "@chakra-ui/react"
import {
    Link
} from "react-router-dom"
import book from '../../assets/book.jpg'
import book2 from '../../assets/book2.jpg'
import bookcard from "../css/bookcard.module.css"
import React from "react";

export default function BookCard(props) {
    return (
            <Box
                className={bookcard.card}
                maxW={{ base: "320px", md: "200px" }}
                borderWidth="1px"
                borderColor={"rgba(0, 0, 0, 0.0)"}
                borderRadius="lg"
                overflow="hidden"
            >
                <Link to={"/book/" + props.id}>
                    <Box align={"center"}  width={"100%"}>
                        {props.id === 1? <Image src={book} className={bookcard.card_image}/> : <Image src={book2} className={bookcard.card_image}/>}
                    </Box>
                </Link>

                <Box p={"4"}>
                    <Link to={"/book/" + props.id}>
                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            className={bookcard.card_title}
                        >
                            {props.id === 1? "Red, White & Royal Blue. Red, White & Royal Blue Red, White & Royal Blue" : "Cookbook"}
                        </Box>
                    </Link>

                    <Box color="gray.600">
                        by Casey McQuiston
                    </Box>

                    <Box
                        fontWeight="bold"
                        fontSize={"2xl"}
                    >
                        $10<span className={bookcard.card_price_decimal}>99</span>
                    </Box>
                </Box>
            </Box>
    );
}