package com.xiwenteoh.bookstore.dao.daoimpl;

import com.xiwenteoh.bookstore.dao.OrderItemDao;
import com.xiwenteoh.bookstore.entity.Item.OrderItem;
import com.xiwenteoh.bookstore.entity.Stats.OrderStatProjection;
import com.xiwenteoh.bookstore.entity.Stats.SalesStatProjection;
import com.xiwenteoh.bookstore.entity.Stats.UserStatProjection;
import com.xiwenteoh.bookstore.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public class OrderItemDaoImpl implements OrderItemDao {
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public void saveAll(List<OrderItem> orderItems) {
        orderItemRepository.saveAll(orderItems);
    }

    @Override
    public List<OrderStatProjection> findOrderStatistics(Long userId, Instant from, Instant to) {
        return orderItemRepository.findOrderStatistics(userId, from, to);
    }

    @Override
    public List<SalesStatProjection> findSalesStatistics(Instant from, Instant to) {
        return orderItemRepository.findSalesStatistics(from, to);
    }

    @Override
    public List<UserStatProjection> findUserStatistics(Instant from, Instant to) {
        return orderItemRepository.findUserStatistics(from, to);
    }
}
