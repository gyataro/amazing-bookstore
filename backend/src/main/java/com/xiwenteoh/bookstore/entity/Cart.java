package com.xiwenteoh.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.xiwenteoh.bookstore.entity.Item.CartItem;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @Column(name = "cart_id")
    private Long cartId;

    @Column(name = "user_id")
    private Long userId;

    @JsonManagedReference
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<CartItem> cartItems = new ArrayList<>();

    @Transient
    public BigDecimal getTotal() {
        BigDecimal sum = new BigDecimal(0);
        List<CartItem> cartItems = getCartItems();

        for(CartItem item : cartItems) {
            sum = sum.add(item.getSubtotal());
        }

        return sum;
    }
}
