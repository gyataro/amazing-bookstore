package com.xiwenteoh.bookstore.service.serviceimpl;

import com.xiwenteoh.bookstore.dao.BookDao;
import com.xiwenteoh.bookstore.dao.CartDao;
import com.xiwenteoh.bookstore.dao.CartItemDao;
import com.xiwenteoh.bookstore.dto.request.CartRequest;
import com.xiwenteoh.bookstore.entity.Book;
import com.xiwenteoh.bookstore.entity.Cart;
import com.xiwenteoh.bookstore.entity.Item.CartItem;
import com.xiwenteoh.bookstore.exception.custom.BookNotFoundException;
import com.xiwenteoh.bookstore.exception.custom.CartNotFoundException;
import com.xiwenteoh.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    /* [USAGE]: Access cart item list for POST, PUT, GET */
    @Autowired
    private CartDao cartDao;

    /* [USAGE]: Directly access items for DELETE */
    @Autowired
    private CartItemDao cartItemDao;

    @Autowired
    private BookDao bookDao;

    @Override
    public Cart findCartByUserId(Long userId) {
        return cartDao.findByUserId(userId)
                .orElseGet(() -> createCart(userId));
    }

    @Override
    public void deleteCart(Long cartId) {
        cartItemDao.deleteAllByCart_CartId(cartId);
    }

    @Override
    public Cart addCartItem(Long userId, CartRequest cartRequest) {
        Book book = bookDao.findBookById(cartRequest.getBookId())
                .orElseThrow(() -> new BookNotFoundException(cartRequest.getBookId()));

        Cart cart = cartDao.findByUserId(userId)
                .orElseGet(() -> createCart(userId));

        CartItem newItem = new CartItem();
        newItem.setItemId(0L);
        newItem.setCart(cart);
        newItem.setBook(book);
        newItem.setQuantity(cartRequest.getQuantity());

        boolean isInCart = false;
        List<CartItem> cartItems = cart.getCartItems();
        for(CartItem item : cartItems) {
            if(item.getBook().getId().equals(book.getId())) {
                isInCart = true;
                item.setQuantity(item.getQuantity() + cartRequest.getQuantity());
            }
        }

        if(!isInCart) {
            cartItems.add(newItem);
        }

        cart.setCartItems(cartItems);
        return cartDao.save(cart);
    }

    @Override
    public Cart updateCartItem(Long userId, CartRequest cartRequest) {
        Cart cart = cartDao.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(userId));

        List<CartItem> cartItems = cart.getCartItems();
        for(CartItem item : cartItems) {
            if(item.getBook().getId().equals(cartRequest.getBookId())) {
                item.setQuantity(cartRequest.getQuantity());
            }
        }

        return cartDao.save(cart);
    }

    @Override
    public void deleteCartItem(Long userId, Integer bookId) {
        Book book = bookDao.findBookById(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId));

        Cart cart = cartDao.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(userId));

        cart.getCartItems().removeIf(cartItem -> cartItem.getBook().getId().equals(book.getId()));

        cartItemDao.deleteByCart_CartIdAndBook_Id(cart.getCartId(), bookId);
    }

    private Cart createCart(Long userId) {
        Cart cart = new Cart();
        cart.setCartId(0L);
        cart.setUserId(userId);
        return cartDao.save(cart);
    }
}
