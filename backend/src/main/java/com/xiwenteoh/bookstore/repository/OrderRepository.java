package com.xiwenteoh.bookstore.repository;

import com.xiwenteoh.bookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findOrdersByUserId(Long userId);

    List<Order> findOrdersByUserIdAndTimestampBetween(Long userId, Instant after, Instant before);

    List<Order> findOrdersByTimestampBetween(Instant after, Instant before);

    Order save(Order order);
}
