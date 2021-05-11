import React from "react"
import {
    Flex,
    Box,
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

export default class SearchView extends React.Component {
    constructor(props) {
        super(props);
        //this.updateList = this.updateList.bind(this);
        this.state = {
            currentUser: authenticationService.currentUserValue,
            bookList: [],
            query: "",
            isDefault: true
        };
    }

    componentDidMount() {
        bookService.getBooks().then(books => this.setState({ bookList: books }));
    }

    /*updateList(search) {
        let tempList = [];
        const filterText = (search.query == null || search.query.length <= 0)? "" : search.query;

        this.setState({query: search.query});
        if(search.query == null || search.query.length <= 0) {
            this.setState({isDefault: true});
        } else {
            this.setState({isDefault: false});
        }

        BOOKLIST.forEach((book, index) => {
            if(book.bookTitle.toLowerCase().indexOf(filterText.toLowerCase()) !== -1) {
                tempList.push(
                    <Box mt={16} mx={2} key={index}>
                        <BookItem
                            bookId={book.bookId}
                            bookUrl={book.bookImg}
                            bookTitle={book.bookTitle}
                            bookAuthor={book.bookAuthor}
                            bookPrice={book.bookPrice}
                        />
                    </Box>
                )
            }
        });

        this.setState({bookList: tempList});
    }

    componentDidMount = () => {
        const search = queryString.parse(this.props.location.search);
        this.updateList(search);
    }

    componentDidUpdate(prevProps) {
        const currSearch = queryString.parse(this.props.location.search);
        const prevSearch = queryString.parse(prevProps.location.search);

        if (prevSearch.query !== currSearch.query){
            this.updateList(currSearch);
        }
    }*/

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

                    <SimpleGrid columns={{base: 1, md: 3, xl: 6}} spacing={"0px"} justify={"center"} width={"100%"}>
                        { this.state.bookList.map(book =>
                            <Box mt={16} mx={2} key={book.id}>
                                <BookItem
                                bookId={book.id}
                                bookUrl={book.imageUrl}
                                bookTitle={book.title}
                                bookAuthor={book.author}
                                bookPrice={book.price}
                                />
                            </Box>
                        )}
                    </SimpleGrid>

                </Stack>
                <Footer />
            </Flex>
        );
    }
}