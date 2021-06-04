package com.xiwenteoh.bookstore.repository;

import com.xiwenteoh.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAll();
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long userId);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String username);
}
