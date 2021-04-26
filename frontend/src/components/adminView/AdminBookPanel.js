import React from 'react';
import {
    Box,
    Button,
    Stack,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Menu,
    MenuList,
    MenuItem,
    MenuButton,
    Spacer
} from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown, FaSearch, FaChevronDown, FaPlusSquare, FaTrash } from "react-icons/fa";

export default class Excel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null,
            search: false,
            preSearchData: null,
        };
    }

    renderToolbar = () => { return (
        <Stack my={"20px"} direction={"row"}>
            <Button onClick={this.toggleSearch}>Search</Button>
            <Menu>
                <MenuButton as={Button} rightIcon={<FaChevronDown size={10}/>}>
                    Export
                </MenuButton>
                <MenuList>
                    <MenuItem
                        as="a"
                        display={"inline-block"}
                        href="data.json"
                        onClick={this.download.bind(this, 'json')}
                        download="data.json"
                    >
                        Export as .json
                    </MenuItem>
                    <MenuItem
                        as="a"
                        display={"inline-block"}
                        href="data.csv"
                        onClick={this.download.bind(this, 'csv')}
                        download="data.csv"
                    >
                        Export as .csv
                    </MenuItem>
                </MenuList>
            </Menu>
            <Spacer />
            <Button mr="10px" variant="link" color={"green"}><FaPlusSquare />&nbsp;Add</Button>
            <Button mr="50px" variant="link" color={"red"}><FaTrash />&nbsp;Remove</Button>
        </Stack>
    );};

    renderTable = () => { return (
        <Table mb={"48px"}>
            <Thead onClick={this.sort}>
            <Tr>{
                this.props.headers.map(function (title, idx) {
                    let sortArrow;

                    if (this.state.sortby === idx) {
                        sortArrow = (this.state.descending)? <FaArrowUp /> : <FaArrowDown />;
                    }

                    return <Th key={idx}>{sortArrow}{title}</Th>;
                }, this)
            }</Tr>
            </Thead>
            <Tbody onDoubleClick={this.showEditor}>
            {this.renderSearch()}
            {this.state.data.map(function (row, rowidx) {
                return (
                <Tr key={rowidx}>{
                row.map(function (cell, idx) {
                let content = cell;
                let edit = this.state.edit;
                if (edit && edit.row === rowidx && edit.cell === idx) {
                content = (
                <form onSubmit={this.save}>
                <Input type="text" defaultValue={cell} variant="filled"/>
                </form>
                );
            }
                return <Td key={idx} data-row={rowidx}>{content}</Td>;
            }, this)}
                </Tr>
                );
            }, this)}
            </Tbody>
        </Table>
    );};

    sort = (e) => {
        let column = e.target.cellIndex;
        let data = this.state.data.slice();
        let descending = this.state.sortby === column
            && !this.state.descending;
        data.sort(function (a, b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1);
        });
        this.setState({
            data: data,
            sortby: column,
            descending: descending,
        });
    };

    showEditor = (e) => {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
        });
    };

    save = (e) => {
        e.preventDefault();
        let input = e.target.firstChild;
        let data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            data: data,
        });
    };

    add = (e) => {

    }

    toggleSearch = () => {
        if (this.state.search) {
            this.setState({
                data: this.preSearchData,
                search: false,
            });
            this.preSearchData = null;
        } else {
            this.preSearchData = this.state.data;
            this.setState({
                search: true,
            });
        }
    };

    search = (e) => {
        let needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({data: this.preSearchData});
            return;
        }
        let idx = e.target.dataset.idx;
        let searchdata = this.preSearchData.filter(function (row) {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({data: searchdata});
    };

    renderSearch = () => {
        if (!this.state.search) {
            return null;
        }
        return (
            <Tr onChange={this.search}>
                {this.props.headers.map(function (ignore, idx) {
                    return (
                        <Td key={idx}>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<FaSearch color="gray.300" />}
                                />
                                <Input type="text" data-idx={idx} placeholder="Search:"/>
                            </InputGroup>
                        </Td>
                    );
                })}
            </Tr>
        );
    };

    download(format, ev) {
        let contents = format === 'json'
            ? JSON.stringify(this.state.data)
            : this.state.data.reduce(function (result, row) {
                return result
                    + row.reduce(function (rowresult, cell, idx) {
                        return rowresult
                            + '"'
                            + cell.toString().replace(/"/g, '""')
                            + '"'
                            + (idx < row.length - 1 ? ',' : '');
                    }, '')
                    + "\n";
            }, '');
        let URL = window.URL || window.webkitURL;
        let blob = new Blob([contents], {type: 'text/' + format});
        ev.target.href = URL.createObjectURL(blob);
        ev.target.download = 'data.' + format;
    };

    render() {
        return (
            <div>
                {this.renderToolbar()}
                {this.renderTable()}
            </div>
        );
    };
}



