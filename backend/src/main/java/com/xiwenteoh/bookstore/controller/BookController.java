package com.xiwenteoh.bookstore.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.xiwenteoh.bookstore.entity.Book;
import com.xiwenteoh.bookstore.exception.BookNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
public class BookController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/api/book", method = RequestMethod.GET)
    public String getBook() {
        List<Book> result = new ArrayList<Book>();

        result = jdbcTemplate.query(
                "SELECT * FROM book",
                (rs, rowNum) -> new Book(
                        rs.getLong("book_id"),
                        rs.getString("isbn"),
                        rs.getString("title"),
                        rs.getString("description"),
                        rs.getString("author"),
                        rs.getString("image_url"),
                        rs.getString("language"),
                        rs.getBigDecimal("price"),
                        rs.getInt("sales"),
                        rs.getInt("stock")
                )
        );

        String booksJSON = JSON.toJSONString(result, SerializerFeature.BrowserCompatible);

        return booksJSON;
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/api/book/{id}", method = RequestMethod.GET)
    public String getBookById(@PathVariable("id") long id) {
        Book result;

        try {
            result = jdbcTemplate.queryForObject(
                    "SELECT * FROM book WHERE book_id = ?",
                    (rs, rowNum) -> new Book(
                            rs.getLong("book_id"),
                            rs.getString("isbn"),
                            rs.getString("title"),
                            rs.getString("description"),
                            rs.getString("author"),
                            rs.getString("image_url"),
                            rs.getString("language"),
                            rs.getBigDecimal("price"),
                            rs.getInt("sales"),
                            rs.getInt("stock")
                    ),
                    id
            );
        } catch(EmptyResultDataAccessException e) {
            throw new BookNotFoundException(id);
        }

        String booksJSON = JSON.toJSONString(result, SerializerFeature.BrowserCompatible);

        return booksJSON;
    }
}
