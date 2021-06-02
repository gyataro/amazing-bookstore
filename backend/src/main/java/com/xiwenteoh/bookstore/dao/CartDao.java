package com.xiwenteoh.bookstore.dao;

import com.xiwenteoh.bookstore.entity.Cart;

public interface CartDao {
    Cart findByUserId(Long userId);

    Cart save(Cart cart);
}
