package com.xiwenteoh.bookstore.entity;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "book")
public class Book {
    @Id
    @Column(name = "book_id")
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
    @JSONField(serialize = false)
    private boolean active;
}

