package com.xiwenteoh.bookstore.dao.daoimpl;

import com.xiwenteoh.bookstore.dao.BookImageDao;
import com.xiwenteoh.bookstore.entity.Image.BookImage;
import com.xiwenteoh.bookstore.repository.BookImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BookImageDaoImpl implements BookImageDao {
    @Autowired
    BookImageRepository bookImageRepository;

    public BookImage save(BookImage bookImage) {
        return bookImageRepository.save(bookImage);
    }

    public BookImage findBookImageById(String uuid) {
        return bookImageRepository.findById(uuid).get();
    }
}
