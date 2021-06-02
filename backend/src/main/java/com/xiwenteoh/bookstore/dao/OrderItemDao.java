package com.xiwenteoh.bookstore.dao;

import com.xiwenteoh.bookstore.entity.Item.OrderItem;

import java.util.List;

public interface OrderItemDao {
    void saveAll(List<OrderItem> orderItems);
}
