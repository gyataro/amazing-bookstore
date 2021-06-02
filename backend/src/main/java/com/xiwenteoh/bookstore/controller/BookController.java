package com.xiwenteoh.bookstore.controller;

import com.alibaba.fastjson.JSONArray;
import com.xiwenteoh.bookstore.entity.Book;
import com.xiwenteoh.bookstore.dto.request.BookRequest;
import com.xiwenteoh.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "")
    public String findBooks() {
        List<Book> books = bookService.findAll();
        return JSONArray.toJSONString(books);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "")
    public String addBook(@RequestBody BookRequest bookRequest) {
        Book book = new Book();
        book.setId(0);
        book.setIsbn(bookRequest.getIsbn());
        book.setTitle(bookRequest.getTitle());
        book.setDescription(bookRequest.getDescription());
        book.setAuthor(bookRequest.getAuthor());
        book.setLanguage(bookRequest.getLanguage());
        book.setImageUrl(bookRequest.getImageUrl());
        book.setPrice(bookRequest.getPrice());
        book.setStock(bookRequest.getStock());
        book.setSales(0);
        return JSONArray.toJSONString(bookService.save(book));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/{bookId}")
    public String findBookById(@PathVariable Integer bookId) {
        Book book = bookService.findBookById(bookId);
        return JSONArray.toJSONString(book);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/{bookId}")
    public String updateBook(@PathVariable Integer bookId, @RequestBody BookRequest bookRequest) {
        Book book = new Book();
        book.setId(bookId);
        book.setIsbn(bookRequest.getIsbn());
        book.setTitle(bookRequest.getTitle());
        book.setDescription(bookRequest.getDescription());
        book.setAuthor(bookRequest.getAuthor());
        book.setLanguage(bookRequest.getLanguage());
        book.setImageUrl(bookRequest.getImageUrl());
        book.setPrice(bookRequest.getPrice());
        book.setStock(bookRequest.getStock());
        book.setSales(bookRequest.getSales());
        return JSONArray.toJSONString(bookService.update(book));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/{bookId}")
    public String deleteBook(@PathVariable Integer bookId) {
        return JSONArray.toJSONString(bookService.deleteBookById(bookId));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/search")
    public String findBookByTitle(@RequestParam("title") String bookTitle) {
        List<Book> books = bookService.findBooksByTitleContaining(bookTitle);
        return JSONArray.toJSONString(books);
    }


}
