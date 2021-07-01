import React from "react"
import {
    Flex,
    Box,
    Button,
    Heading,
    Stack,
    Text,
    SimpleGrid
} from "@chakra-ui/react"
import Header from "../components/general/Header"
import Footer from "../components/general/Footer"
import BookItem from "../components/general/BookItem"
import queryString from "query-string"

import { bookService } from "../services/bookService";
import { authenticationService } from "../services/authService";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const PAGE_SIZE = 18;

export default class SearchView extends React.Component {
    constructor(props) {
        super(props);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.getPage = this.getPage.bind(this);
        this.state = {
            currentUser: authenticationService.currentUserValue,
            currentPage: 0,
            bookList: [],
            query: "",
            isDefault: true
        };
    }

    componentDidMount() {
        this.getPage(this.state.currentPage, PAGE_SIZE);
    }

    nextPage() {
        this.setState(prevState => {
            return{
                ...prevState,
                currentPage: prevState.currentPage + 1
            }
        }, () => {
            this.getPage(this.state.currentPage, PAGE_SIZE);
        });
    }

    prevPage() {
        this.setState(prevState => {
            return{
                ...prevState,
                currentPage: prevState.currentPage - 1
            }
        }, () => {
            this.getPage(this.state.currentPage, PAGE_SIZE);
        });
    }

    getPage(page, size) {
        const urlParams = new URLSearchParams(window.location.search);
        const titleParam = urlParams.get('title');
        bookService.searchByTitle(titleParam, page, size).then(books => this.setState({ bookList: books }));
    }

    render() {
        return (
            <Flex
                direction={"column"}
                align={"center"}
                w={"100%"}
                minWidth={"320px"}
                m={"0 auto"}
                key={queryString.parse(this.props.location.search).query}
            >
                <Header />

                <Stack
                    maxW={"90%"}
                    minH={"100vh"}
                    direction={"column"}
                    mt={{ base: "120px", md: "-30px", xl: "0px"}}
                    pt={"28px"}
                    mb={"120px"}
                    spacing={"0px"}
                >
                    <Box align={"center"}>
                        <Heading>
                            {(this.state.isDefault)? "All books" : "Search Result"}
                        </Heading>
                        <Text>
                            {`About ${this.state.bookList.length} books`}
                        </Text>
                    </Box>

                    <PageButtonGroup prevPage={this.prevPage} nextPage={this.nextPage} />

                    <SimpleGrid columns={{base: 1, md: 3, xl: 6}} spacing={"0px"} justify={"center"} width={"100%"}>
                        { this.state.bookList.map(book =>
                            <Box mt={16} mx={2} key={book.id}>
                                <BookItem
                                bookId={book.id}
                                bookImageUrl={book.imageUrl}
                                bookTitle={book.title}
                                bookAuthor={book.author}
                                bookPrice={book.price}
                                />
                            </Box>
                        )}
                    </SimpleGrid>

                    <PageButtonGroup prevPage={this.prevPage} nextPage={this.nextPage} />

                </Stack>
                <Footer />
            </Flex>
        );
    }
}

function PageButtonGroup(props) {
    return (
        <SimpleGrid columns={2}>
            <Button
                onClick={() => {props.prevPage()}}
                mt={"40px"}
                color={"black"}
                _hover={{
                    bg: "#EDF2F7"
                }}
                variant="ghost"
            >
                <FaAngleLeft />&nbsp;&nbsp;Prev
            </Button>
            <Button
                onClick={() => {props.nextPage()}}
                mt={"40px"}
                color={"black"}
                _hover={{
                    bg: "#EDF2F7"
                }}
                variant="ghost"
            >
                Next&nbsp;&nbsp;<FaAngleRight />
            </Button>
        </SimpleGrid>
    )
}