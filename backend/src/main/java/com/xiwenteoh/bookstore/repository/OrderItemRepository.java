package com.xiwenteoh.bookstore.repository;

import com.xiwenteoh.bookstore.entity.Item.OrderItem;
import com.xiwenteoh.bookstore.entity.Stats.OrderStatProjection;
import com.xiwenteoh.bookstore.entity.Stats.SalesStatProjection;
import com.xiwenteoh.bookstore.entity.Stats.UserStatProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query(value =
            "SELECT book_id AS bookId, title, isbn, sum(quantity) as quantity, sum(subtotal) as subtotal " +
                    "FROM order_item NATURAL JOIN `order` NATURAL JOIN book " +
                    "WHERE user_id = :userId AND timestamp BETWEEN :from AND :to " +
                    "GROUP BY book_id WITH ROLLUP",
            nativeQuery = true)
    List<OrderStatProjection> findOrderStatistics(Long userId, Instant from, Instant to);

    @Query(value =
            "SELECT book_id AS bookId, title, isbn, sum(quantity) as quantity, sum(subtotal) as subtotal " +
                    "FROM order_item NATURAL JOIN `order` NATURAL JOIN book " +
                    "WHERE timestamp BETWEEN :from AND :to " +
                    "GROUP BY book_id WITH ROLLUP " +
                    "ORDER BY (IF(book_id is null, -1, sum(quantity))) DESC",
            nativeQuery = true)
    List<SalesStatProjection> findSalesStatistics(Instant from, Instant to);

    @Query(value =
            "SELECT username, sum(quantity) as quantity, sum(subtotal) as subtotal " +
                    "FROM order_item NATURAL JOIN `order` NATURAL JOIN user_auth " +
                    "WHERE timestamp BETWEEN :from AND :to " +
                    "GROUP BY username WITH ROLLUP " +
                    "ORDER BY (IF(username is null, -1, sum(quantity))) DESC",
            nativeQuery = true)
    List<UserStatProjection> findUserStatistics(Instant from, Instant to);
}
