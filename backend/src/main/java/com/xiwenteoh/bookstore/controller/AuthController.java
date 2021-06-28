package com.xiwenteoh.bookstore.controller;

import com.xiwenteoh.bookstore.dto.request.RegisterRequest;
import com.xiwenteoh.bookstore.dto.request.LoginRequest;
import com.xiwenteoh.bookstore.dto.response.Response;
import com.xiwenteoh.bookstore.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        authService.login(loginRequest)
                ),
                HttpStatus.OK
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        authService.register(registerRequest)
                ),
                HttpStatus.OK
        );
    }
}
