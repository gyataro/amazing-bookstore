package com.xiwenteoh.bookstore.service;

import com.xiwenteoh.bookstore.dto.request.BookRequest;
import com.xiwenteoh.bookstore.dto.resource.BookResource;

import java.io.IOException;
import java.util.List;

public interface BookService {
    List<BookResource> findAll();

    List<BookResource> findBooksByTitleContaining(String title, Integer page, Integer size);

    BookResource findBookById(Integer bookId);

    void deleteBookById(Integer bookId);

    BookResource save(BookRequest bookRequest) throws IOException;

    BookResource update(Integer bookId, BookRequest bookRequest) throws IOException;
}
