package com.xiwenteoh.bookstore.repository;

import com.xiwenteoh.bookstore.entity.Image.BookImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookImageRepository extends JpaRepository<BookImage, String> {

}
