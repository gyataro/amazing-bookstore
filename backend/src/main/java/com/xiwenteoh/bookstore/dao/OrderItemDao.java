package com.xiwenteoh.bookstore.dao;

import com.xiwenteoh.bookstore.entity.Item.OrderItem;
import com.xiwenteoh.bookstore.entity.Stats.OrderStatProjection;
import com.xiwenteoh.bookstore.entity.Stats.SalesStatProjection;
import com.xiwenteoh.bookstore.entity.Stats.UserStatProjection;

import java.time.Instant;
import java.util.List;

public interface OrderItemDao {
    void saveAll(List<OrderItem> orderItems);

    List<OrderStatProjection> findOrderStatistics(Long userId, Instant from, Instant to);
    List<SalesStatProjection> findSalesStatistics(Instant from, Instant to);
    List<UserStatProjection> findUserStatistics(Instant from, Instant to);
}
