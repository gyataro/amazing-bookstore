package com.xiwenteoh.bookstore.service.serviceimpl;

import com.xiwenteoh.bookstore.dao.BookDao;
import com.xiwenteoh.bookstore.dto.mapper.BookMapper;
import com.xiwenteoh.bookstore.dto.request.BookRequest;
import com.xiwenteoh.bookstore.dto.resource.BookResource;
import com.xiwenteoh.bookstore.entity.Book;
import com.xiwenteoh.bookstore.exception.custom.BookNotFoundException;
import com.xiwenteoh.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

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
    public BookResource save(BookRequest bookRequest) {
        Book book = BookMapper.INSTANCE.bookRequestToBook(bookRequest);
        book.setId(0);

        return BookMapper.INSTANCE.bookToBookResource(
                bookDao.save(book)
        );
    }

    @Override
    public BookResource update(Integer bookId, BookRequest bookRequest) {
        Book book = BookMapper.INSTANCE.bookRequestToBook(bookRequest);
        book.setId(bookId);

        if(bookDao.existsBookById(book.getId())) {
            return BookMapper.INSTANCE.bookToBookResource(
                    bookDao.save(book)
            );
        } else {
            throw new BookNotFoundException(book.getId());
        }
    }
}
