package com.xiwenteoh.bookstore.entity;

import java.math.BigDecimal;

public class Book {
    private Long id;
    private String isbn;
    private String title;
    private String description;
    private String author;
    private String image_url;
    private String language;
    private BigDecimal price;
    private Integer sales;
    private Integer stock;

    public Book(
            Long id,
            String isbn,
            String title,
            String description,
            String author,
            String image_url,
            String language,
            BigDecimal price,
            Integer sales,
            Integer stock
    ) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;
        this.description = description;
        this.author = author;
        this.image_url = image_url;
        this.language = language;
        this.price = price;
        this.sales = sales;
        this.stock = stock;
    }

    public Long getId() { return id; }
    public String getIsbn() { return isbn; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getAuthor() { return author; }
    public String getImageUrl() { return image_url; }
    public String getLanguage() { return language; }
    public BigDecimal getPrice() { return price; }
    public Integer getSales() { return sales; }
    public Integer getStock() { return stock; }
}

