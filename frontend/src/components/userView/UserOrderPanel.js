import {
    Box, Divider
} from '@chakra-ui/react';
import React from "react";
import Order from "./Order";

export default function UserOrderPanel(props) {
    return (
        props.orderList.map(order =>
            <Box key={order.cartId}>
                <Order order={order} />
                <Divider mb={["10px", "28px"]} mt={"28px"} />
            </Box>
        )
    );
}