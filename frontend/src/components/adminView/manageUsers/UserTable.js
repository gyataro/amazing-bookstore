import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import {
    Box,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr, Th, Td,
    HStack,
    Badge
} from "@chakra-ui/react";
import { FaUserSlash } from "react-icons/fa";
import { userService } from "../../../services/userService";

const UserTable = (props) => {
    const [users, setUsers] = useState([]);
    const usersRef = useRef();

    usersRef.current = users;

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        userService.getUsers().then(users => {
            setUsers(users);
        }).catch(e => {
            console.log(e);
        })
    }

    const banUser = (rowIndex) => {
        const userId = usersRef.current[rowIndex].id;

        userService.banUser(userId).then(() => {
            let updatedUsers = [...usersRef.current];
            updatedUsers[rowIndex].roles = [{id: 0, roleType: "ROLE_BANNED"}];
            setUsers(updatedUsers);
        }).catch(e => {
            console.log(e);
        })
    }

    // Define react-table columns
    const columns = useMemo(() => [
        { Header: "id", accessor: "id" },
        { Header: "username", accessor: "username" },
        { Header: "email", accessor: "email" },
        {
            Header: "roles",
            accessor: "roles",
            Cell: (props) => {
                return (
                    <HStack>
                        {props.value.map(role => {
                            if(role.roleType === "ROLE_USER"){
                                return <Badge key={role.id}>USER</Badge>
                            } else if(role.roleType === "ROLE_ADMIN") {
                                return <Badge key={role.id} colorScheme="green">ADMIN</Badge>
                            } else {
                                return <Badge key={role.id} colorScheme="red">BANNED</Badge>
                            }
                        })}
                    </HStack>
                )
            }
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: (props) => {
                const rowIndex = props.row.id;
                return (
                    <HStack>
                        <IconButton
                            onClick={() => {banUser(rowIndex)}}
                            variant="link"
                            colorScheme="red"
                            aria-label="Call Sage"
                            fontSize="20px"
                            icon={<FaUserSlash />}
                        />
                    </HStack>
                )
            }
        }
    ], []);

    // Use react-table with defined columns and data
    const tableInstance = useTable({
        columns,
        data: users
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

export default UserTable;