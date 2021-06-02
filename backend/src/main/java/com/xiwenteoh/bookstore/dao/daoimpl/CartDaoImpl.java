package com.xiwenteoh.bookstore.dao.daoimpl;

import com.xiwenteoh.bookstore.dao.CartDao;
import com.xiwenteoh.bookstore.entity.Cart;
import com.xiwenteoh.bookstore.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CartDaoImpl implements CartDao {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart findByUserId(Long userId) { return cartRepository.findCartByUserId(userId); }

    @Override
    public Cart save(Cart cart) { return cartRepository.save(cart); }
}
