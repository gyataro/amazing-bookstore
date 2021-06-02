import React from "react"
import {
    Flex,
    Box,
    Image,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuGroup,
    MenuItem,
    MenuDivider
} from '@chakra-ui/react';
import {
    Link
} from 'react-router-dom';
import Search from "./Search"
import logo from '../../assets/logo-light.svg';
import { FaShoppingCart, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { BsThreeDotsVertical, BsX } from 'react-icons/bs';
import { authenticationService } from "../../services/authService";
import { history } from "../../utils/history";

const MenuItems = props => {
    const { children, isLast, to = "/", ...rest } = props
    return (
        <Box
            mb={{ base: isLast ? 0 : 8, sm: 0 }}
            mr={{ base: 0, sm: isLast ? 0 : 8 }}
            display="block"
            {...rest}
        >
            <Link to={to}>{children}</Link>
        </Box>
    )
}

export default function Header(props) {
    const [show, setShow] = React.useState(false)
    const toggleMenu = () => setShow(!show)
    const isLoggedIn = authenticationService.currentUserValue != null

    return (
        <Flex
            position={{ base: "fixed", md: "relative" }}
            zIndex={1}
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={6}
            bg={"#1A202C"}
            color={"white"}
            {...props}
        >
            <Flex align="center">
                <Link to={'/'}>
                    <Image w="100px" src={logo} />
                </Link>
            </Flex>

            <Box w={["0%", "0%", "35%", "50%"]} display={{ base: "none", md: "block" }}>
                <Search />
            </Box>

            <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
                {show ? <BsX size={'28px'} /> : <BsThreeDotsVertical size={'28px'} />}
            </Box>

            <Box
                display={{ base: show ? "block" : "none", md: "block" }}
                flexBasis={{ base: "100%", md: "auto" }}
            >
                <Flex
                    align={["center", "center", "center", "center"]}
                    justify={["center", "space-between", "flex-end", "flex-end"]}
                    direction={["column", "row", "row", "row"]}
                    pt={[8, 8, 0, 0]}
                    pb={[4, 0, 0, 0]}
                >
                    <MenuItems to="/cart">
                        <Button
                            leftIcon={<FaShoppingCart />}
                            size="md"
                            rounded="md"
                            color={"white"}
                            colorScheme="none"
                            variant="ghost"
                        >
                            My Cart
                        </Button>
                    </MenuItems>
                    {
                        (isLoggedIn)? hasUser(authenticationService.currentUserValue) : noUser()
                    }
                </Flex>
                <Box pt={[5, 5, 0, 0]} display={{ base: "block", md: "none" }}>
                    <Search />
                </Box>
            </Box>
        </Flex>
    );
}

function hasUser(user) {
    return (
        <>
            <Menu>
                <MenuButton
                    as={Button}
                    leftIcon={<FaUserCircle />}
                    rightIcon={<FaCaretDown />}
                    size="md"
                    rounded="md"
                    color={"white"}
                    _hover={{
                        bg: "#FF9900",
                        color: "black"
                    }}
                    variant="outline"
                >
                    Hi, {user.username.toString()}
                </MenuButton>
                <MenuList color={"black"}>
                    <MenuGroup title="Profile">
                        <MenuItem onClick={() => history.push('/user')}>My Orders</MenuItem>
                        <MenuItem onClick={() => {authenticationService.logout(); history.push('/login')}}>Logout</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Help">
                        <MenuItem>Support</MenuItem>
                        <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>

        </>
    )
}

function noUser() {
    return (
        <>
            <MenuItems to="/login">
                <Button
                    size="md"
                    rounded="md"
                    color={"white"}
                    colorScheme="teal"
                    variant="link"
                >
                    Login
                </Button>
            </MenuItems>
            <MenuItems to="/register" isLast>
                <Button
                    size="md"
                    rounded="md"
                    color={"white"}
                    bg={"#2B6CB0"}
                    _hover={{
                        bg: "#4299E1"
                    }}
                >
                    Sign Up
                </Button>
            </MenuItems>
        </>
    );
}