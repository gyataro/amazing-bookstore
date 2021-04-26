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
    TabPanel
} from "@chakra-ui/react";
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import AdminBookPanel from "../components/adminView/AdminBookPanel";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCashRegister, FaBoxes, FaUserCog, FaChartLine } from 'react-icons/fa';

const headers = ["Book", "Author", "Language", "ISBN13", "Price", "Stock"];
const data = [
    ["The Lord of the Rings", "J. R. R. Tolkien", "English", "9781234567897", 19.99, 31],
    ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "9787271334355", 5.99, 12],
    ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "9780383976352", 39.99, 23],
    ["And Then There Were None", "Agatha Christie", "English", "9789447354198", 78.88, 48],
    ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "9781359809483", 14.58, 7],
    ["The Hobbit", "J. R. R. Tolkien", "English", "9785786308694", 78.99, 9],
    ["She: A History of Adventure", "H. Rider Haggard", "English", "9782418102590", "38.88", 6]
];

export default function AdminView(props) {
    return (
        <Flex
            display={"flex"}
            direction={"column"}
            align={"center"}
            w={"100%"}
            minWidth={"320px"}
            m={"0 auto"}
            {...props}
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
                        Welcome, Admin
                    </Heading>
                </Stack>
            </Box>

            <Tabs
                mt={"48px"}
                w={"80%"}
                variant="enclosed-colored"
                colorScheme="facebook"
                minH={"60vh"}
            >
                <TabList>
                    <Tab><FaCashRegister fontSize={"18px"}/>&nbsp;Manage Orders</Tab>
                    <Tab><FaBoxes fontSize={"18px"}/>&nbsp;Manage Books</Tab>
                    <Tab><FaUserCog fontSize={"18px"}/>&nbsp;Manage Users</Tab>
                    <Tab><FaChartLine fontSize={"18px"}/>&nbsp;Statistics</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p>管理员可以查看系统中所有的订单，并且可以使用搜索功能来实现过滤，具体可以按照时间范围或书籍名称过滤</p>
                    </TabPanel>
                    <TabPanel>
                        <AdminBookPanel headers={headers} initialData={data}/>
                    </TabPanel>
                    <TabPanel>
                        <p>管理员可以禁用/解禁用户，被禁用的用户将无法登录系统</p>
                    </TabPanel>
                    <TabPanel>
                        <p>管理员可以统计在指定时间范围内各种书的销量情况，按照销售量排序，形成热销榜，以图或表的方式呈现</p>
                        <p>管理员可以统计在指定时间范围内每个用户的累计消费情况，按照购书进行排序，形成消费榜，以图或表的方式呈现</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Footer />
        </Flex>
    );
}