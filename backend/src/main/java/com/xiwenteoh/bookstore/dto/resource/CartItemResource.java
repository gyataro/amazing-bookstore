package com.xiwenteoh.bookstore.dto.resource;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartItemResource {
    private Long itemId;

    private BookResource details;

    private Integer quantity;

    private BigDecimal subtotal;
}
