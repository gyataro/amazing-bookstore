package com.xiwenteoh.bookstore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Response<T> {
    private StatusType status;
    private T data;

    public enum StatusType { success, fail, error }
}
