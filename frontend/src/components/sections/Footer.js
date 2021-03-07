import {
    Box,
    chakra,
    Container, Flex, Image,
    Link,
    Stack,
    Text,
    VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { AiFillWechat } from 'react-icons/ai'
import React, { ReactNode } from 'react';
import logo from "../../assets/logo-light.svg";

const SocialButton = ({
                          children,
                          label,
                          href,
                      }: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={'whiteAlpha.100'}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: 'whiteAlpha.200'
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function Footer() {
    return (
        <Box
            align="center"
            w="100%"
            bg={"#1A202C"}
            color={'gray.200'}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Flex align="center">
                    <Link to={'/'}>
                        <Image w="80px" src={logo} />
                    </Link>
                </Flex>
                <Text>© 2021 Amazing Bookstore. All rights reserved</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Twitter'} href={'#'}>
                        <AiFillWechat />
                    </SocialButton>
                    <SocialButton label={'YouTube'} href={'#'}>
                        <FaYoutube />
                    </SocialButton>
                    <SocialButton label={'Instagram'} href={'#'}>
                        <FaInstagram />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
}