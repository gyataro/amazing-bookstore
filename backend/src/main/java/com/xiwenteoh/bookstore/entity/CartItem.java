package com.xiwenteoh.bookstore.entity;

import java.math.BigDecimal;

public class CartItem {
    private Long bookId;
    private String title;
    private String imageUrl;
    private Integer quantity;
    private BigDecimal price;

    public CartItem(Long bookId, String title, String imageUrl, Integer quantity, BigDecimal price) {
        this.bookId = bookId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.price = price;
    }

    public Long getBookId() { return bookId; }
    public Integer getQuantity() { return quantity; }
    public String getTitle() { return title; }
    public String getImageUrl() { return imageUrl; }
    public BigDecimal getPrice() { return price; }
}
