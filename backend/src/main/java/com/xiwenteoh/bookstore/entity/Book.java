package com.xiwenteoh.bookstore.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "book")
public class Book {
    @Id
    @Column(name = "book_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String isbn;
    private String title;
    private String description;
    private String author;

    @Column(name = "image_url")
    private String imageUrl;

    private String language;
    private BigDecimal price;
    private Integer sales;
    private Integer stock;

    @Column(name = "is_active")
    private boolean active = true;
}

