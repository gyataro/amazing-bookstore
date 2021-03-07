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
import { IoPersonCircleOutline } from 'react-icons/io5';
import { FaTag, FaShoppingCart, FaChartLine } from 'react-icons/fa'
import Header from "../sections/Header"
import Footer from "../sections/Footer"

export default function UserPage(props) {
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
                        Welcome, User
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
                    <Tab><FaShoppingCart fontSize={"18px"}/>&nbsp;My Cart</Tab>
                    <Tab><FaTag fontSize={"18px"}/>&nbsp;My Orders</Tab>
                    <Tab><FaChartLine fontSize={"18px"}/>&nbsp;Statistics</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p>当用户浏览书籍时，可以选择将某本书放入购物车</p>
                        <p>用户可以浏览购物车，看到自己放入购物车的所有书籍</p>
                        <p>在购物车中点击购买书籍之后，清空购物车，同时书籍库存相应地减少</p>
                    </TabPanel>
                    <TabPanel>
                        <p>购买书籍后，生成订单，展示给用户，并将订单存入数据库</p>
                        <p>顾客可以查看自己的所有订单，并且可以使用搜索功能来实现过滤，具体可以按照时间范围或书籍名称过滤</p>
                    </TabPanel>
                    <TabPanel>
                        顾客可以统计在指定时间范围内自己购买书籍的情况 ，包括每种书购买了多少本，购书总本数和总金额
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Footer />
        </Flex>
    );
}