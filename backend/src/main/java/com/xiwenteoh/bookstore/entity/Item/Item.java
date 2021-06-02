package com.xiwenteoh.bookstore.entity.Item;

import com.xiwenteoh.bookstore.entity.Book;
import lombok.Data;

import javax.persistence.*;

@Data
@MappedSuperclass
public abstract class Item {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long itemId;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private Integer quantity;
}
