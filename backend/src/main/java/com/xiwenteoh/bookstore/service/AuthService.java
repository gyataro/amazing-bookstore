package com.xiwenteoh.bookstore.service;

import com.xiwenteoh.bookstore.dto.request.LoginRequest;
import com.xiwenteoh.bookstore.dto.request.RegisterRequest;
import com.xiwenteoh.bookstore.dto.resource.JwtResource;

public interface AuthService {
    JwtResource register(RegisterRequest registerRequest);
    JwtResource login(LoginRequest loginRequest);
}
