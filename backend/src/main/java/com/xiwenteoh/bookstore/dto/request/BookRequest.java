package com.xiwenteoh.bookstore.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data
public class BookRequest {
    private String isbn;
    private String title;
    private String description;
    private String author;
    private MultipartFile image;
    private String language;
    private BigDecimal price;
    private Integer stock;
    private Integer sales;
}
