import React from "react";
import {
    Box,
    Flex,
    Heading,
    Stack,
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCashRegister, FaBoxes, FaUserCog, FaChartLine } from 'react-icons/fa';
import BookTable from "../components/adminView/manageBooks/BookTable";
import UserTable from "../components/adminView/manageUsers/UserTable";
import OrderTable from "../components/adminView/manageOrders/OrderTable";
import UsersStatsTable from "../components/adminView/manageStats/UsersStatsTable";
import SalesStatsTable from "../components/adminView/manageStats/SalesStatsTable";

export default class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                    mt={"28px"}
                    w={"80%"}
                    borderWidth={"1px"}
                    borderRadius={"lg"}
                    p={{ base: "28px", md: "28px" }}
                >
                    <Stack direction={"row"} align={"center"}>
                        <IoPersonCircleOutline fontSize={"72px"}/>
                        <Heading fontSize={"3xl"}>
                            Administrator Control Panel
                        </Heading>
                    </Stack>
                </Box>

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
                        <Tab><FaCashRegister fontSize={"18px"}/>&nbsp;Manage Orders</Tab>
                        <Tab><FaBoxes fontSize={"18px"}/>&nbsp;Manage Books</Tab>
                        <Tab><FaUserCog fontSize={"18px"}/>&nbsp;Manage Users</Tab>
                        <Tab><FaChartLine fontSize={"18px"}/>&nbsp;User Statistics</Tab>
                        <Tab><FaChartLine fontSize={"18px"}/>&nbsp;Sales Statistics</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <OrderTable />
                        </TabPanel>
                        <TabPanel>
                            <BookTable />
                        </TabPanel>
                        <TabPanel>
                            <UserTable />
                        </TabPanel>
                        <TabPanel>
                            <UsersStatsTable />
                        </TabPanel>
                        <TabPanel>
                            <SalesStatsTable />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Footer />
            </Flex>
        );
    }
}