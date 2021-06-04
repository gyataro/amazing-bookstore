package com.xiwenteoh.bookstore.exception.custom;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long userId) {
        super(String.format("User with ID = %d not found", userId));
    }
}
