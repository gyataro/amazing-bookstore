package com.xiwenteoh.bookstore.dao.daoimpl;

import com.xiwenteoh.bookstore.dao.CartItemDao;
import com.xiwenteoh.bookstore.entity.Item.CartItem;
import com.xiwenteoh.bookstore.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CartItemDaoImpl implements CartItemDao {

    @Autowired
    CartItemRepository cartItemRepository;

    @Override
    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public void deleteAllByCart_CartId(Long cartId) {
        cartItemRepository.deleteAllByCart_CartId(cartId);
    }

    @Override
    public void deleteByCart_CartIdAndBook_Id(Long cartId, Integer bookId) {
        cartItemRepository.deleteByCart_CartIdAndBook_Id(cartId, bookId);
    }
}
