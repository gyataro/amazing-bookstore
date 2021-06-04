package com.xiwenteoh.bookstore.exception.custom;

public class CartNotFoundException extends RuntimeException {
    public CartNotFoundException(Long userId) {
        super(String.format("Cart with user ID = %d not found", userId));
    }
}

