import React from "react"
import { Link } from "react-router-dom"
import { Box, Flex, Text, Button, Stack } from "@chakra-ui/react"

export default function Header(props) {
    return (
        <Flex
            direction="column"
            align="center"
            maxW={{ xl: "1200px" }}
            m="0 auto"W
            {...props}
        >
        </Flex>
    );
}