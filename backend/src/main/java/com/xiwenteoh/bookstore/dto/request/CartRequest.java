package com.xiwenteoh.bookstore.dto.request;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class CartRequest {
    @NotNull
    private Integer bookId;

    @NotNull
    private Integer quantity;
}
