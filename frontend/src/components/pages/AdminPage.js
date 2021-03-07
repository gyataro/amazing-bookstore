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

import Header from "../sections/Header"
import Footer from "../sections/Footer"
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCashRegister, FaBoxes, FaUserCog, FaChartLine } from 'react-icons/fa'

export default function AdminPage(props) {
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
                        <p>管理员可以浏览数据库中已有的书籍，以列表形式显示，包括书名、作者、封面、ISBN 编号和库存量</p>
                        <p>在列表上方提供搜索功能，管理员可以用书名来过滤想要查找的书籍</p>
                        <p>管理员在列表中可以修改每本图书的上述各种属性，包括书名、作者、封面、ISBN 编号和库存量</p>
                        <p>管理员可以删除旧图书，可以添加新图书</p>
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