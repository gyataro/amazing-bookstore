package com.xiwenteoh.bookstore.entity.Stats;

import java.math.BigDecimal;

public interface UserStatProjection {
    String getUsername();
    Integer getQuantity();
    BigDecimal getSubtotal();
}
