package com.xiwenteoh.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.xiwenteoh.bookstore.entity.Item.OrderItem;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "`order`")
public class Order {
    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private Long userId;

    private Integer statusId;

    private BigDecimal total;

    private Instant timestamp;

    @JsonManagedReference
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<OrderItem> orderItems = new ArrayList<>();

    /*@Transient
    public BigDecimal getTotal() {
        BigDecimal sum = new BigDecimal(0);
        List<OrderItem> orderItems = getOrderItems();

        for(OrderItem item : orderItems) {
            sum = sum.add(item.getSubtotal());
        }

        return sum;
    }*/
}
