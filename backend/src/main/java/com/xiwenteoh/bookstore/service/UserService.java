package com.xiwenteoh.bookstore.service;

import com.xiwenteoh.bookstore.entity.User;

import java.util.List;

public interface UserService {
    void ban(Long userId);
    List<User> findAll();
}
