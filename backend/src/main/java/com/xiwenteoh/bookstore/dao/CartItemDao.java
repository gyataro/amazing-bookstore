package com.xiwenteoh.bookstore.dao;

import com.xiwenteoh.bookstore.entity.Item.CartItem;

public interface CartItemDao {
    CartItem save(CartItem cartItem);

    void deleteAllByCart_CartId(Long cartId);

    void deleteByCart_CartIdAndBook_Id(Long cartId, Integer bookId);
}
