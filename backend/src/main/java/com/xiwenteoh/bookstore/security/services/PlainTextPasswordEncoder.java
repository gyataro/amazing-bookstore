package com.xiwenteoh.bookstore.security.services;

import org.springframework.security.crypto.password.PasswordEncoder;

// FUNCTION: Password encoder, currently no encryption is used in DEV environment
public class PlainTextPasswordEncoder implements PasswordEncoder {

    @Override
    public String encode(CharSequence charSequence) {
        return charSequence.toString();
    }

    @Override
    public boolean matches(CharSequence charSequence, String s) {
        return charSequence.toString().equals(s);
    }
}
