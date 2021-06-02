package com.xiwenteoh.bookstore.entity.Item;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xiwenteoh.bookstore.entity.Order;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "order_item")
public class OrderItem extends Item {
    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    private BigDecimal subtotal;
}
