package com.xiwenteoh.bookstore.service;

import com.xiwenteoh.bookstore.dto.request.LoginRequest;
import com.xiwenteoh.bookstore.dto.request.RegisterRequest;
import com.xiwenteoh.bookstore.dto.resource.JwtResource;
import com.xiwenteoh.bookstore.entity.User;

import java.util.List;

public interface AuthService {
    List<User> findAll();
    JwtResource register(RegisterRequest registerRequest);
    JwtResource login(LoginRequest loginRequest);
}
