package com.xiwenteoh.bookstore.dao;

import com.xiwenteoh.bookstore.entity.Cart;

import java.util.Optional;

public interface CartDao {
    Optional<Cart> findByUserId(Long userId);

    Cart save(Cart cart);
}
