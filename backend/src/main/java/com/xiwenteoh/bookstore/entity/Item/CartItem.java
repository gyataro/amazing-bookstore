package com.xiwenteoh.bookstore.entity.Item;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xiwenteoh.bookstore.entity.Cart;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "cart_item")
public class CartItem extends Item {
    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private Cart cart;

    @Transient
    public BigDecimal getSubtotal() {
        return getBook().getPrice().multiply(new BigDecimal(getQuantity()));
    }
}


