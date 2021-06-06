import React from "react";
import {
    Box,
    Flex,
    Heading,
    Stack,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels
} from "@chakra-ui/react";
import { IoPersonCircleOutline } from 'react-icons/io5';
import { FaChartLine, FaCashRegister } from 'react-icons/fa'
import Header from "../components/general/Header"
import Footer from "../components/general/Footer"
import UserOrderTable from "../components/userView/myOrders/UserOrderTable";
import UserStatsTable from "../components/userView/myStats/UserStatsTable";
import { authenticationService } from "../services/authService";

export default class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: typeof authenticationService.currentUserValue != "undefined"
        }
    }

    render() {
        return (
            <Flex
                display={"flex"}
                direction={"column"}
                align={"center"}
                w={"100%"}
                minWidth={"320px"}
                m={"0 auto"}
            >
                <Header />

                <UserHero user={authenticationService.currentUserValue} isLoggedIn={this.state.isLoggedIn} />

                <Tabs
                    isLazy
                    mt={"48px"}
                    mb={"48px"}
                    w={"80%"}
                    variant="enclosed-colored"
                    colorScheme="facebook"
                    minH={"60vh"}
                >
                    <TabList overflow={"scroll"}>
                        <Tab><FaCashRegister fontSize={"18px"}/>&nbsp;My Orders</Tab>
                        <Tab><FaChartLine fontSize={"18px"}/>&nbsp;Statistics</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <UserOrderTable />
                        </TabPanel>
                        <TabPanel>
                            <UserStatsTable />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Footer />
            </Flex>
        );
    }
}

function UserHero(props) {
    return (
        <Box
            w={"80%"}
            borderWidth={"1px"}
            borderRadius={"lg"}
            p={{ base: "28px", md: "28px" }}
        >
            <Stack direction={"row"} align={"center"}>
                <UserAvatar />
                <Heading fontSize={"3xl"} overflow={"hidden"}>
                    Welcome, {(props.isLoggedIn)? props.user.username.toString() : "User"}
                </Heading>
            </Stack>
        </Box>
    )
}

function UserAvatar(avatar) {
    return (
        <Box display={{ base: "none", md: "block" }}>
            <IoPersonCircleOutline fontSize={"72px"}/>
        </Box>
    );
}