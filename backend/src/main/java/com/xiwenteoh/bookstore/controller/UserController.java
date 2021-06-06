package com.xiwenteoh.bookstore.controller;

import com.xiwenteoh.bookstore.dto.response.Response;
import com.xiwenteoh.bookstore.security.jwt.AuthEntryPointJwt;
import com.xiwenteoh.bookstore.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Autowired
    UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        userService.findAll()
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> banUser(@PathVariable Long userId) {
        userService.ban(userId);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        null
                ),
                HttpStatus.NO_CONTENT
        );
    }
}
