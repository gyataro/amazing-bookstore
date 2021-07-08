package com.xiwenteoh.bookstore.service.serviceimpl;

import com.xiwenteoh.bookstore.dao.CartDao;
import com.xiwenteoh.bookstore.dao.CartItemDao;
import com.xiwenteoh.bookstore.dao.OrderDao;
import com.xiwenteoh.bookstore.entity.Cart;
import com.xiwenteoh.bookstore.entity.Item.CartItem;
import com.xiwenteoh.bookstore.entity.Item.OrderItem;
import com.xiwenteoh.bookstore.entity.Order;
import com.xiwenteoh.bookstore.exception.custom.CartNotFoundException;
import com.xiwenteoh.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private CartDao cartDao;

    @Autowired
    private CartItemDao cartItemDao;

    @Override
    public List<Order> findAll() {
        return orderDao.findAll();
    }

    @Override
    public List<Order> findOrdersByUserId(Long userId) {
        return orderDao.findOrdersByUserId(userId);
    }

    @Override
    public List<Order> findOrdersByUserIdAndTitle(Long userId, String title) {
        return orderDao.findOrdersByUserIdAndTitle(userId, title);
    }

    @Override
    public List<Order> findOrdersByUserIdAndTimestampBetween(Long userId, Instant after, Instant before) {
        return orderDao.findOrdersByUserIdAndTimestampBetween(userId, after, before);
    }

    @Override
    public List<Order> findOrdersByTimestampBetween(Instant after, Instant before) {
        return orderDao.findOrdersByTimestampBetween(after, before);
    }

    @Override
    public List<Order> findOrdersByTitle(String title) {
        return orderDao.findOrdersByTitle(title);
    }

    @Override
    @Transactional
    public Order addOrder(Long userId) {
        Cart cart = cartDao.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(userId));

        Order order = new Order();
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal sum = new BigDecimal(0L);
        for(CartItem item : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setSubtotal(item.getSubtotal());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setBook(item.getBook());
            orderItems.add(orderItem);

            sum = sum.add(orderItem.getSubtotal());
        }

        order.setStatusId(1);
        order.setTimestamp(Instant.now());
        order.setTotal(sum);
        order.setUserId(userId);
        order.setOrderItems(orderItems);

        cart.getCartItems().clear();
        cartItemDao.deleteAllByCart_CartId(cart.getCartId());
        return orderDao.save(order);
    }
}
