package com.xiwenteoh.bookstore.service.serviceimpl;

import com.xiwenteoh.bookstore.dao.BookDao;
import com.xiwenteoh.bookstore.dao.CartDao;
import com.xiwenteoh.bookstore.dao.CartItemDao;
import com.xiwenteoh.bookstore.entity.Book;
import com.xiwenteoh.bookstore.entity.Cart;
import com.xiwenteoh.bookstore.entity.Item.CartItem;
import com.xiwenteoh.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private CartItemDao cartItemDao;

    @Autowired
    private BookDao bookDao;

    @Override
    public Cart findCartByUserId(Long userId) {
        return cartDao.findByUserId(userId);
    }

    @Override
    public void deleteCart(Long cartId) {
        cartItemDao.deleteAllByCart_CartId(cartId);
    }

    @Override
    public Cart addCartItem(Long userId, Integer bookId, Integer quantity) {
        Book book = bookDao.findBookById(bookId);
        Cart cart = cartDao.findByUserId(userId);

        if(quantity == null || quantity <= 0 || book == null || cart == null)
            return cart;

        CartItem newItem = new CartItem();
        newItem.setItemId(0L);
        newItem.setCart(cart);
        newItem.setBook(book);
        newItem.setQuantity(quantity);

        List<CartItem> cartItems = cart.getCartItems();
        for(CartItem item : cartItems) {
            if(item.getBook().getId().equals(book.getId())) {
                newItem.setItemId(item.getItemId());
                newItem.setQuantity(item.getQuantity() + quantity);
            }
        }

        cartItemDao.save(newItem);
        return cartDao.findByUserId(userId);
    }

    @Override
    public Cart updateCartItem(Long userId, Integer bookId, Integer quantity) {
        Cart cart = cartDao.findByUserId(userId);

        if(quantity == null || quantity <= 0 || cart == null)
            return cart;

        List<CartItem> cartItems = cart.getCartItems();
        for(CartItem item : cartItems) {
            if(item.getBook().getId().equals(bookId)) {
                CartItem newItem = new CartItem();
                newItem.setItemId(item.getItemId());
                newItem.setBook(item.getBook());
                newItem.setCart(item.getCart());
                newItem.setQuantity(quantity);
                cartItemDao.save(newItem);
                return cartDao.findByUserId(userId);
            }
        }

        return cart;
    }

    @Override
    public void deleteCartItem(Long userId, Integer bookId) {
        Book book = bookDao.findBookById(bookId);
        Cart cart = cartDao.findByUserId(userId);

        cart.getCartItems().removeIf(cartItem -> cartItem.getBook().getId().equals(book.getId()));

        cartItemDao.deleteByCart_CartIdAndBook_Id(cart.getCartId(), book.getId());
    }
}
