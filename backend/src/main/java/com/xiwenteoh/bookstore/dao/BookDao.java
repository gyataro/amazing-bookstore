package com.xiwenteoh.bookstore.dao;

import com.xiwenteoh.bookstore.entity.Book;

import java.util.List;
import java.util.Optional;

public interface BookDao {
    List<Book> findAll();

    List<Book> findBooksByTitleContaining(String title, Integer page, Integer size);

    Optional<Book> findBookById(Integer id);

    Integer deleteBookById(Integer id);

    Book save(Book book);

    Boolean existsBookById(Integer id);
}
