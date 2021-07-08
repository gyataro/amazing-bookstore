package com.xiwenteoh.bookstore.service.serviceimpl;

import com.xiwenteoh.bookstore.dao.BookDao;
import com.xiwenteoh.bookstore.dao.BookImageDao;
import com.xiwenteoh.bookstore.dto.mapper.BookMapper;
import com.xiwenteoh.bookstore.dto.request.BookRequest;
import com.xiwenteoh.bookstore.dto.resource.BookResource;
import com.xiwenteoh.bookstore.entity.Book;
import com.xiwenteoh.bookstore.entity.Image.BookImage;
import com.xiwenteoh.bookstore.exception.custom.BookNotFoundException;
import com.xiwenteoh.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Autowired
    private BookImageDao bookImageDao;

    @Override
    public List<BookResource> findAll() {
        return BookMapper.INSTANCE.bookToBookResource(
                bookDao.findAll()
        );
    }

    @Override
    public List<BookResource> findBooksByTitleContaining(String title, Integer page, Integer size) {
        return BookMapper.INSTANCE.bookToBookResource(
                bookDao.findBooksByTitleContaining(title, page, size)
        );
    }

    @Override
    public BookResource findBookById(Integer bookId) {
        Book book = bookDao.findBookById(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId));

        return BookMapper.INSTANCE.bookToBookResource(book);
    }

    @Override
    @Transactional
    public void deleteBookById(Integer id) {
        bookDao.deleteBookById(id);
    }

    @Override
    public BookResource save(BookRequest bookRequest) throws IOException {
        /* Extract image data */
        MultipartFile file = bookRequest.getImage();
        BookImage bookImage = new BookImage(file.getContentType(), file.getBytes());

        /* Save book image */
        bookImageDao.save(bookImage);

        /* Generate book image URL */
        String bookImageUrl = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/image/book/")
                .path(bookImage.getId())
                .toUriString();

        Book book = BookMapper.INSTANCE.bookRequestToBook(bookRequest);
        book.setId(0);
        book.setImageUrl(bookImageUrl);

        return BookMapper.INSTANCE.bookToBookResource(
                bookDao.save(book)
        );
    }

    @Override
    public BookResource update(Integer bookId, BookRequest bookRequest) throws IOException {

        /* Check if book with ID exists */
        Book book = bookDao.findBookById(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId));

        Book newBook = BookMapper.INSTANCE.bookRequestToBook(bookRequest);
        newBook.setId(bookId);
        newBook.setImageUrl(book.getImageUrl());

        /* Update book image */
        MultipartFile file = bookRequest.getImage();
        if(file != null && !file.isEmpty()) {
            String[] urlComponents = book.getImageUrl().split("/");
            String bookImageId = urlComponents[urlComponents.length - 1];

            BookImage bookImage = bookImageDao.findBookImageById(bookImageId);
            bookImage.setData(file.getBytes());
            bookImage.setType(file.getContentType());
            bookImageDao.save(bookImage);
        }

        return BookMapper.INSTANCE.bookToBookResource(
                bookDao.save(newBook)
        );
    }
}
