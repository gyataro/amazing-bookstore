import { useForm } from "react-hook-form";
import React from "react";
import {
    FormControl,
    Input,
    Button,
    Stack,
    Box
} from "@chakra-ui/react";
import { ImSearch } from 'react-icons/im';

export default function Search() {
    const { handleSubmit, register, formState } = useForm();

    function validateName(value) {
        return true;
    }

    function onSubmit(values) {
        return new Promise(resolve => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                resolve();
            }, 3000);
        });
    }

    return (
        <Box borderRadius={"md"} overflow={"hidden"}>
            <form style={{width: "100%"}} onSubmit={handleSubmit(onSubmit)}>
                <Stack width="100%" direction={"row"} spacing={0}>
                    <FormControl>
                        <Input
                            bg="white"
                            color="black"
                            name="query"
                            placeholder="Search for book"
                            ref={register({ validate: validateName })}
                            borderRadius={0}
                        />
                    </FormControl>
                    <Button
                        mt={4}
                        color="#1A202C"
                        bg="#FF9900"
                        isLoading={formState.isSubmitting}
                        type="submit"
                        borderRadius={0}
                        _hover={{
                            bg: "#FBD38D"
                        }}
                    >
                        <ImSearch fontSize='24px' />
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}

