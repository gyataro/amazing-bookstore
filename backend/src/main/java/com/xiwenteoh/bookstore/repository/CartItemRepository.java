package com.xiwenteoh.bookstore.repository;

import com.xiwenteoh.bookstore.entity.Item.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem save(CartItem cartItem);
    void deleteAllByCart_CartId(Long cartId);
    void deleteByCart_CartIdAndBook_Id(Long cartId, Integer bookId);
}
