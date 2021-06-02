import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    Text
} from "@chakra-ui/react"
import { FaShoppingBasket, FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { orderService } from "../../services/orderService";

const { useDisclosure } = require("@chakra-ui/hooks");

export default function Checkout() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    function handleCheckout() {
        onOpen();
        orderService.addOrder();
    }

    return (
        <>
            <Button
                onClick={handleCheckout}
                color={"white"}
                bg={"#2F855A"}
                _hover={{
                    bg: "#48BB78"
                }}
            >
                <FaShoppingBasket />&nbsp;&nbsp;Continue Checkout
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        bg={"#2F855A"}
                        color={"white"}
                        align={"center"}
                    >
                        <b>Checkout complete</b>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack padding={"20px"} align={"center"}>
                            <FaRegCheckCircle color={"#2F855A"} size={"5rem"}/>
                            <Text fontSize="xl">{"\n"}Thank you for your payment!</Text>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Stack width={"100%"}>
                            <Link to={'/user'}>
                            <Button
                                width={"100%"}
                                color={"white"}
                                bg={"#2F855A"}
                                _hover={{
                                    bg: "#48BB78"
                                }}
                                mr={3}
                                onClick={onClose}
                            >
                                View order
                            </Button>
                            </Link>
                            <Link to={'/search'}>
                            <Button
                                width={"100%"}
                                mr={3}
                                color={"gray"}
                                variant="link"
                            >
                                Back to homepage
                            </Button>
                            </Link>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}