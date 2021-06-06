/*import {
    Box, Button, Divider, FormControl, FormLabel, Grid, GridItem, Input, InputGroup, InputRightElement, Stack
} from '@chakra-ui/react';
import React from "react";
import Order from "./Order";
import {useForm} from "react-hook-form";
import {orderService} from "../../services/orderService";
import { FaSearch } from "react-icons/fa";

class UserOrderPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        };
    }

    componentDidMount() {
        orderService.getOrders().then(orders => {
            this.setState({ orderList: orders });
        });
    }

    render() {
        return (
            <Box>
                <OrderSearchForm />
                {this.state.orderList.map(order => {
                    <Box key={order.orderId}>
                        <Order order={order} />
                        <Divider mb={["10px", "28px"]} mt={"28px"} />
                    </Box>
                })}
            </Box>
        );
    }
}

const OrderSearchForm = (props) => {
    const { handleSubmit, errors, register, formState } = useForm();

    function onSubmit(values) {
        return new Promise(resolve => {
            if(values.title !== ""){

            } else {
                const from = new Date(values.from);
                const to = new Date(values.to);
                orderService.searchOrdersByDate(from.toISOString(), to.toISOString()).then(orders => {
                    props.setOrders(orders);
                })
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

export default UserOrderPanel;*/