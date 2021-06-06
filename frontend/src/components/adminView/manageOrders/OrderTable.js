import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import { orderService } from "../../../services/orderService"
import {
    Box,
    Badge,
    Button,
    Text,
    Stack,
    Input,
    Table, Thead, Tbody, Tr, Th, Td,
    FormControl, FormLabel,
    Grid, GridItem, InputGroup, InputRightElement
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const ordersRef = useRef();

    ordersRef.current = orders;

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        orderService.getOrders().then(orders => {
            setOrders(orders);
        }).catch(e => {
            console.log(e);
        })
    }

    // Define react-table columns
    const columns = useMemo(() => [
        { Header: "id", accessor: "orderId" },
        {
            Header: "Time",
            accessor: "timestamp",
            Cell: (props) => {
                return (
                    <Text key={props.row.id}>{new Date(props.value).toUTCString()}</Text>
                )
            }
        },
        {
            Header: "Status",
            accessor: "statusId",
            Cell: (props) => {
                if(props.value === 1) {
                    return <Badge key={props.row.id} colorScheme="green">Paid</Badge>
                }
            }
        },
        {
            Header: "",
            accessor: "orderItems",
            Cell: (props) => {
                return (
                    <Table key={props.row.id} variant="unstyled">
                        <Tbody>
                        {props.value.map(item => (
                            <Tr key={item.itemId}>
                                <Th>{item.book.title}</Th>
                                <Th>{item.quantity}</Th>
                                <Th>${item.subtotal}</Th>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                )
            }
        },
        {
            Header: "Total",
            accessor: "total",
            Cell: (props) => {
                return (
                    <Text key={props.row.id}><b>${props.value}</b></Text>
                )
            }
        }
    ], []);

    // Use react-table with defined columns and data
    const tableInstance = useTable({
        columns,
        data: orders
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
            <OrderSearchForm setOrders={setOrders} />
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

const OrderSearchForm = (props) => {
    const { handleSubmit, register, formState } = useForm();

    function onSubmit(values) {
        return new Promise(resolve => {
            if(values.title !== ""){
                orderService.searchOrdersByTitle(values.title).then(orders => {
                    props.setOrders(orders);
                    resolve();
                })
            } else if(values.from && values.to) {
                const from = new Date(values.from);
                const to = new Date(values.to);
                orderService.searchOrdersByDate(from.toISOString(), to.toISOString()).then(orders => {
                    props.setOrders(orders);
                    resolve();
                })
            } else {
                alert("Need to input search title / date range")
                resolve();
            }
        });
    }

    return (
        <Stack mb={12} mt={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(2, 1fr)"
                    gap={6}
                >
                    <GridItem rowSpan={1} colSpan={[2, 1]}>
                        <FormControl id="from">
                            <FormLabel>From</FormLabel>
                            <Input
                                name="from"
                                type="date"
                                ref={register()} // Link to onSubmit()
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={[2, 1]}>
                        <FormControl id="to">
                            <FormLabel>To</FormLabel>
                            <Input
                                name="to"
                                type="date"
                                ref={register()} // Link to onSubmit()
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={2}>
                        <FormControl id="title">
                            <FormLabel>Title</FormLabel>
                            <InputGroup>
                                <InputRightElement
                                    pointerEvents="none"
                                    children={<FaSearch color="gray.300" />}
                                />
                                <Input
                                    name="title"
                                    type="text"
                                    placeholder="Search by title"
                                    ref={register()}
                                />
                            </InputGroup>
                        </FormControl>
                    </GridItem>
                </Grid>
                <Button
                    mt={"28px"}
                    isLoading={formState.isSubmitting}
                    colorScheme={'facebook'}
                    type={'submit'}
                    width={["100%", "20%"]}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Search
                </Button>
            </form>
        </Stack>
    );
};

export default OrderTable;