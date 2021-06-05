package com.xiwenteoh.bookstore.entity.Stats;

import java.math.BigDecimal;

public interface SalesStatProjection {
    Integer getBookId();
    String getTitle();
    String getIsbn();
    Integer getQuantity();
    BigDecimal getSubtotal();
}
