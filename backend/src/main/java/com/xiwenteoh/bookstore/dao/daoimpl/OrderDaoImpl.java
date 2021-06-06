package com.xiwenteoh.bookstore.dao.daoimpl;

import com.xiwenteoh.bookstore.dao.OrderDao;
import com.xiwenteoh.bookstore.entity.Order;
import com.xiwenteoh.bookstore.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> findOrdersByUserId(Long userId) {
        return orderRepository.findOrdersByUserId(userId);
    }

    @Override
    public List<Order> findOrdersByUserIdAndTitle(Long userId, String title) {
        return orderRepository.findOrdersByUserIdAndTitle(userId, title);
    }

    @Override
    public List<Order> findOrdersByUserIdAndTimestampBetween(Long userId, Instant after, Instant before) {
        return orderRepository.findOrdersByUserIdAndTimestampBetween(userId, after, before);
    }

    @Override
    public List<Order> findOrdersByTimestampBetween(Instant after, Instant before) {
        return orderRepository.findOrdersByTimestampBetween(after, before);
    }

    @Override
    public List<Order> findOrdersByTitle(String title) {
        return orderRepository.findOrdersByTitle(title);
    }

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }
}
