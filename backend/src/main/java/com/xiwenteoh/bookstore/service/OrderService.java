package com.xiwenteoh.bookstore.service;

import com.xiwenteoh.bookstore.entity.Order;

import java.time.Instant;
import java.util.List;

public interface OrderService {
    List<Order> findAll();
    List<Order> findOrdersByUserId(Long userId);
    List<Order> findOrdersByUserIdAndTimestampBetween(Long userId, Instant after, Instant before);
    List<Order> findOrdersByTimestampBetween(Instant after, Instant before);
    Order addOrder(Long userId);
}
