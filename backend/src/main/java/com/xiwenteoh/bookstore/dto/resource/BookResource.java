package com.xiwenteoh.bookstore.dto.resource;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BookResource {
    private Integer id;
    private String isbn;
    private String title;
    private String description;
    private String author;
    private String imageUrl;
    private String language;
    private BigDecimal price;
    private Integer stock;
    private Integer sales;
}
