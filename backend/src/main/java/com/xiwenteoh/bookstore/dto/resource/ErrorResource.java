package com.xiwenteoh.bookstore.dto.resource;

import lombok.Data;

import java.util.List;

@Data
public class ErrorResource {
    private List<ErrorDetail> errors;

    @Data
    public static class ErrorDetail {
        private String field;
        private String message;
    }
}
