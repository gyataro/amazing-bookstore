package com.xiwenteoh.bookstore.entity.Stats;

import java.math.BigDecimal;

public interface OrderStatProjection {
    Integer getBookId();
    String getTitle();
    String getIsbn();
    Integer getQuantity();
    BigDecimal getSubtotal();
}
