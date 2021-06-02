package com.xiwenteoh.bookstore.repository;

import com.xiwenteoh.bookstore.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart findCartByUserId(Long userId);

    Cart save(Cart cart);
}
