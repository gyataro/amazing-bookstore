package com.xiwenteoh.bookstore.exception.custom;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(Integer bookId) {
        super(String.format("Book with ID = %d not found", bookId));
    }
}
