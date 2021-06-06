package com.xiwenteoh.bookstore.repository;

import com.xiwenteoh.bookstore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findOrdersByUserId(Long userId);

    List<Order> findOrdersByUserIdAndTimestampBetween(Long userId, Instant after, Instant before);

    List<Order> findOrdersByTimestampBetween(Instant after, Instant before);

    @Query(value =
            "SELECT DISTINCT * " +
                    "FROM `order` NATURAL JOIN order_item NATURAL JOIN book " +
                    "WHERE title LIKE CONCAT('%',:title,'%') AND user_id = :userId",
            nativeQuery = true)
    List<Order> findOrdersByUserIdAndTitle(Long userId, String title);

    @Query(value =
            "SELECT DISTINCT * " +
                    "FROM `order` NATURAL JOIN order_item NATURAL JOIN book " +
                    "WHERE title LIKE CONCAT('%',:title,'%')",
            nativeQuery = true)
    List<Order> findOrdersByTitle(String title);

    Order save(Order order);
}
