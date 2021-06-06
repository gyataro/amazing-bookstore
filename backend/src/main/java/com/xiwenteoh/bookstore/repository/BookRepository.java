package com.xiwenteoh.bookstore.repository;

import com.xiwenteoh.bookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("SELECT b FROM Book b WHERE b.active = true")
    List<Book> findAll();

    List<Book> findBooksByTitleContainingAndActiveTrue(String title);

    Optional<Book> findBookById(Integer id);

    Boolean existsBookById(Integer id);

    @Modifying
    @Query("UPDATE Book b SET b.active = false WHERE b.id = :bookId")
    Integer deleteBookById(@Param("bookId") Integer bookId);
}
