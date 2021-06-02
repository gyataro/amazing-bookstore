package com.xiwenteoh.bookstore.service;

import com.xiwenteoh.bookstore.entity.Book;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BookService {
    List<Book> findAll();

    List<Book> findBooksByTitleContaining(String title);

    Book findBookById(Integer id);

    @Transactional
    Integer deleteBookById(Integer id);

    Book save(Book book);

    Book update(Book book);
}
