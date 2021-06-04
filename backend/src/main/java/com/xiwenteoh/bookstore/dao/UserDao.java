package com.xiwenteoh.bookstore.dao;

import com.xiwenteoh.bookstore.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    List<User> findAll();
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long userId);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    User save(User user);
    User saveAndFlush(User user);
}
