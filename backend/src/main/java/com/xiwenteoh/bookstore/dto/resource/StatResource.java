package com.xiwenteoh.bookstore.dto.resource;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class StatResource<T> {
    private List<T> table;
    private Integer totalQuantity;
    private BigDecimal totalValue;
}
