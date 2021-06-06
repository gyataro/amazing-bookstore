import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import { bookService } from "../../../services/bookService"
import {
    Box,
    Button,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr, Th, Td,
    HStack,
    Input,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import { history } from "../../../utils/history";

const BookTable = (props) => {
    const [books, setBooks] = useState([]);
    const booksRef = useRef();

    booksRef.current = books;

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = () => {
        bookService.getBooks().then(books => {
            setBooks(books);
        }).catch(e => {
            console.log(e);
        })
    }

    const updateBook = (rowIndex) => {
        const bookId = booksRef.current[rowIndex].id;
        history.push(`/admin/book/${bookId}`)
    }

    const deleteBook = (rowIndex) => {
        const bookId = booksRef.current[rowIndex].id;

        bookService.deleteBook(bookId).then(() => {
            let newBooks = [...booksRef.current];
            newBooks.splice(rowIndex, 1);
            setBooks(newBooks);
        }).catch(e => {
            console.log(e);
        })
    }

    // Define react-table columns
    const columns = useMemo(() => [
        { Header: "id", accessor: "id" },
        { Header: "Title", accessor: "title" },
        { Header: "Author", accessor: "author" },
        { Header: "ISBN", accessor: "isbn" },
        { Header: "Language", accessor: "language" },
        { Header: "Price", accessor: "price" },
        { Header: "Stock", accessor: "stock" },
        { Header: "Sales", accessor: "sales" },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: (props) => {
                const rowIndex = props.row.id;
                return (
                    <HStack>
                        <IconButton
                            onClick={() => {updateBook(rowIndex)}}
                            variant="link"
                            colorScheme="black"
                            aria-label="Call Sage"
                            fontSize="20px"
                            icon={<FaEdit />}
                        />
                        <IconButton
                            onClick={() => {deleteBook(rowIndex)}}
                            variant="link"
                            colorScheme="red"
                            aria-label="Call Sage"
                            fontSize="20px"
                            icon={<FaTrashAlt />}
                        />
                    </HStack>
                )
            }
        }
    ], []);

    // Use react-table with defined columns and data
    const tableInstance = useTable({
        columns,
        data: books
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <Box overflow={"auto"}>
            <Box mb={"30px"} mt={"15px"}>
                <BookSearch setBooks={setBooks}/>
                <BookCreateButton />
            </Box>
            <Table
                {...getTableProps()}
            >
                <Thead>
                {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Th {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </Th>
                        ))}
                    </Tr>
                ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                                );
                            })}
                        </Tr>
                    );
                })}
                </Tbody>
            </Table>
        </Box>
    );
}

const BookSearch = (props) => {
    const [searchTitle, setSearchTitle] = useState("");

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            searchByTitle();
        }
    }

    const searchByTitle = () => {
        bookService.searchByTitle(searchTitle).then(books => {
            props.setBooks(books);
        })
    }

    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents="none"
                children={<FaSearch color="gray.300" />}
            />
            <Input
                type="text"
                placeholder="Search by title"
                onChange={onChangeSearchTitle}
                onKeyPress={handleKeyPress}
            />
        </InputGroup>
    )
}

const BookCreateButton = () => {
    return (
        <Button
            onClick={() => {history.push("/admin/book")}}
            mt={"28px"}
            colorScheme={'green'}
            width={["100%", "20%"]}
            _hover={{
                bg: 'blue.500',
            }}>
            + Add book
        </Button>
    )
}

export default BookTable;