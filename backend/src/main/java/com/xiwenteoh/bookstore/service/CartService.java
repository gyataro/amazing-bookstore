package com.xiwenteoh.bookstore.service;

import com.xiwenteoh.bookstore.dto.request.CartRequest;
import com.xiwenteoh.bookstore.entity.Cart;

public interface CartService {
    void deleteCart(Long cartId);
    Cart findCartByUserId(Long userId);
    Cart addCartItem(Long userId, CartRequest cartRequest);
    Cart updateCartItem(Long userId, CartRequest cartRequest);
    Cart deleteCartItem(Long userId, Integer bookId);
}
