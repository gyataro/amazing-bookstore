package com.xiwenteoh.bookstore.dao;

import com.xiwenteoh.bookstore.entity.Image.BookImage;

public interface BookImageDao {
    BookImage save(BookImage bookImage);
    BookImage findBookImageById(String uuid);
}
