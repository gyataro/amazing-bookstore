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
import {
    Link,
} from 'react-router-dom';
import Header from "../components/general/Header";
import Footer from "../components/general/Footer";
import Excel from "../components/general/Excel";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaCashRegister, FaBoxes, FaUserCog, FaChartLine } from 'react-icons/fa';
import { bookService } from "../services/bookService";

export default class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            bookList: [],
            bookListHeader: ["id", "title", "author", "language", "isbn", "price", "stock", "sales"],
            userList: [],
            stats: null
        };
    }

    componentDidMount() {
        bookService.getBooks().then(books => {
                let booksList = [];
                for(let i=0; i<books.length; i++){
                    booksList.push([]);
                    booksList[i].push(books[i]["id"]);
                    booksList[i].push(<Link to={`book/${books[i]["id"]}`}>{books[i]["title"]}</Link>);
                    booksList[i].push(books[i]["author"]);
                    booksList[i].push(books[i]["language"]);
                    booksList[i].push(books[i]["isbn"]);
                    booksList[i].push(books[i]["price"]);
                    booksList[i].push(books[i]["stock"]);
                    booksList[i].push(books[i]["sales"]);
                }
                this.setState({bookList: booksList});
        });
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
                            <Excel headers={this.state.bookListHeader} initialData={this.state.bookList}/>
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
}