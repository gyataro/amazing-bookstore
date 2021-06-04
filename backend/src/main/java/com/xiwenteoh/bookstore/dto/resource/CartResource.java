package com.xiwenteoh.bookstore.dto.resource;

import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class CartResource {

    private Long cartId;

    private Long userId;

    private List<CartItemResource> cartItems = new ArrayList<>();

    private BigDecimal total;
}
