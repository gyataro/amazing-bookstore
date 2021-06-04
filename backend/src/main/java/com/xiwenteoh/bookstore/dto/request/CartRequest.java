package com.xiwenteoh.bookstore.dto.request;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class CartRequest {
    @NotNull(message = "Book ID must not be null")
    @NotEmpty(message = "Book ID must not be empty")
    private Integer bookId;

    @NotNull(message = "Book quantity must not be null")
    @NotEmpty(message = "Book quantity must not be empty")
    @Min(value = 1, message = "Book quantity must be at least 1")
    private Integer quantity;
}
