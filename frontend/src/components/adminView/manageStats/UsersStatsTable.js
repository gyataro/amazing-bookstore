import React, { useState, useMemo, useRef } from "react";
import { useTable } from "react-table";
import {
    Box,
    Button,
    Stack,
    Input,
    Table, Thead, Tbody, Tr, Th, Td,
    FormControl, FormLabel,
    Grid, GridItem,
    Stat, StatLabel, StatNumber, StatGroup
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { statsService } from "../../../services/statsService";

const UsersStatsTable = () => {
    const [entries, setEntries] = useState([]);
    const entriesRef = useRef();

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    entriesRef.current = entries;

    const updateStats = (stats) => {
        setTotalQuantity(stats.totalQuantity);
        setTotalValue(stats.totalValue);
        setEntries(stats.table);
    }

    // Define react-table columns
    const columns = useMemo(() => [
        {
            Header: "Rank",
            accessor: "row",
            Cell: (props) => {
                return parseInt(props.row.id) + 1;
            }
        },
        { Header: "Username", accessor: "username" },
        {
            Header: "Total",
            accessor: "subtotal",
            Cell: (props) => {
                return "$" + props.value.toString();
            }
        },
        { Header: "Quantity", accessor: "quantity" }
    ], []);

    // Use react-table with defined columns and data
    const tableInstance = useTable({
        columns,
        data: entries
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
            <SearchForm updateStats={updateStats} />
            <StatGroup width={["100%", "35%"]} mb={"24px"}>
                <Stat>
                    <StatLabel>Total Revenue</StatLabel>
                    <StatNumber>${totalValue}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Total Books Sold</StatLabel>
                    <StatNumber>{totalQuantity}</StatNumber>
                </Stat>
            </StatGroup>
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

const SearchForm = (props) => {
    const { handleSubmit, register } = useForm();

    function onSubmit(values) {
        return new Promise(resolve => {
            if(values.from && values.to) {
                const from = new Date(values.from);
                const to = new Date(values.to);
                statsService.getUsersStats(from.toISOString(), to.toISOString()).then(entries => {
                    props.updateStats(entries);
                    resolve();
                })
            }
        });
    }

    return (
        <Stack mb={12} mt={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    templateRows="repeat(1, 1fr)"
                    templateColumns="repeat(2, 1fr)"
                    gap={6}
                >
                    <GridItem rowSpan={1} colSpan={[2, 1]}>
                        <FormControl id="from">
                            <FormLabel>From</FormLabel>
                            <Input
                                isRequired
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
                                isRequired
                                name="to"
                                type="date"
                                ref={register()} // Link to onSubmit()
                            />
                        </FormControl>
                    </GridItem>
                </Grid>
                <Button
                    mt={"28px"}
                    //isLoading={formState.isSubmitting}
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

export default UsersStatsTable;