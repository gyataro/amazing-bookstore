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
import { FaTag, FaChartLine } from 'react-icons/fa'
import Header from "../components/general/Header"
import Footer from "../components/general/Footer"
import UserOrderPanel from "../components/userView/UserOrderPanel"
import UserStatPanel from "../components/userView/UserStatPanel"

export default class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: (props.userName)? props.userName : "User"
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
                <Box
                    mt={{ base: "120px", md: "20px", xl: "20px"}}
                    mb={{ base: "48px", md: "48px", xl: "48px"}}
                    minH={"75vh"}
                    w={"100%"}
                    align={"center"}
                >

                    <UserHero userName={this.state.userName} />

                    <Tabs
                        mt={"48px"}
                        w={"80%"}
                        variant="enclosed-colored"
                        colorScheme="facebook"
                        minH={"60vh"}
                        isLazy={"true"}

                    >
                        <TabList>
                            <Tab w={{ base: "100%" }}><FaTag fontSize={"18px"}/>&nbsp;My Orders</Tab>
                            <Tab w={{ base: "100%" }}><FaChartLine fontSize={"18px"}/>&nbsp;Statistics</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <UserOrderPanel />
                            </TabPanel>
                            <TabPanel>
                                <UserStatPanel />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>

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
                    Welcome, {props.userName}
                </Heading>
            </Stack>
        </Box>
    )
}

function UserAvatar(props) {
    return (
        <Box display={{ base: "none", md: "block" }}>
            <IoPersonCircleOutline fontSize={"72px"}/>
        </Box>
    );
}