package com.xiwenteoh.bookstore.dao;

import com.xiwenteoh.bookstore.entity.Order;

import java.time.Instant;
import java.util.List;

public interface OrderDao {
    List<Order> findAll();

    List<Order> findOrdersByUserId(Long userId);

    List<Order> findOrdersByUserIdAndTitle(Long userId, String title);

    List<Order> findOrdersByUserIdAndTimestampBetween(Long userId, Instant after, Instant before);

    List<Order> findOrdersByTimestampBetween(Instant after, Instant before);

    List<Order> findOrdersByTitle(String title);

    Order save(Order order);
}
