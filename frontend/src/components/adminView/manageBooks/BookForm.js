import React, { useEffect, useMemo } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    Select,
    Box,
    Center,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Stack
} from '@chakra-ui/react';
import { useForm, Controller } from "react-hook-form";
import { bookService } from "../../../services/bookService";
import { history } from "../../../utils/history";

class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: props.match.params.id,
            book: {
                title: "",
                author: "",
                isbn: "",
                imageUrl: "",
                description: "",
                language: "en",
                price: 0,
                stock: 0,
                sales: 0
            }
        };
    }

    componentDidMount() {
        if(this.state.bookId) {
            bookService.getBook(this.state.bookId).then(book => {
                this.setState({book: book});
            })
        }
    }

    render() {
        return (
            <Center mt={"40px"}>
                <Form
                    book={this.state.book}
                    bookId={this.state.bookId}
                />
            </Center>
        )
    }
}

const Form = (props) => {
    const { control, register, reset, handleSubmit, formState } = useForm({
        defaultValues: useMemo(() => {
            console.log("Book has changed");
            return props.book;
        }, [props])
    });

    useEffect(() => {
        console.log("Reset");
        reset(props.book);
    }, [props.book], []);

    const onSubmit = (values) => {
        return new Promise(resolve => {
            if(props.bookId) {
                bookService.updateBook(values, props.bookId).then(book => {
                    alert("Success!");
                    history.push("/admin");
                    resolve();
                })
            } else {
                console.log(values);
                bookService.createBook(values).then(book => {
                    alert("Success!");
                    history.push("/admin");
                    resolve();
                })
            }
        });
    };

    return (
        <Stack direction={"column"}
            as="form"
            width={["100%", "100%", "100%", "50%"]}
            alignItems="flex-start"
            spacing={"24px"}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input name="title" ref={register} />
            </FormControl>

            <FormControl>
                <FormLabel>Author</FormLabel>
                <Input name="author" ref={register} />
            </FormControl>

            <FormControl>
                <FormLabel>ISBN</FormLabel>
                <Input name="isbn" ref={register} />
            </FormControl>

            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" ref={register} />
            </FormControl>

            <FormControl>
                <FormLabel>Book Image</FormLabel>
                <Input type="file" accept="image/*" name="image" ref={register} />
            </FormControl>

            <FormControl>
                <FormLabel>Language</FormLabel>
                <Select
                    isRequired
                    placeholder="Select language"
                    name="language"
                    ref={register()}
                >
                    <option value="en">English</option>
                    <option value="zh">Mandarin</option>
                </Select>
            </FormControl>

            <FormControl>
                <FormLabel>Price</FormLabel>
                <Controller
                    control={control}
                    name="price"
                    render={({ name, ...restProps }) => (
                        <NumberInput {...restProps}>
                            <NumberInputField name={name} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    )}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Stock</FormLabel>
                <Controller
                    control={control}
                    name="stock"
                    render={({ name, ...restProps }) => (
                        <NumberInput {...restProps}>
                            <NumberInputField name={name} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    )}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Sales</FormLabel>
                <Controller
                    control={control}
                    name="sales"
                    render={({ name, ...restProps }) => (
                        <NumberInput {...restProps}>
                            <NumberInputField name={name} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    )}
                />
            </FormControl>

            <Box width={"100%"}>
                <Button
                    width={"100%"}
                    isLoading={formState.isSubmitting}
                    colorScheme={'facebook'}
                    type={'submit'}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Submit Book
                </Button>
                <Button
                    onClick={() => { history.push("/admin") }}
                    isLoading={formState.isSubmitting}
                    mt={"10px"}
                    width={"100%"}
                    colorScheme={'red'}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                    Cancel
                </Button>
            </Box>
        </Stack>
    )
}

export default BookForm;