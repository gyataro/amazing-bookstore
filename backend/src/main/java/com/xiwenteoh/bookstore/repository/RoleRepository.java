package com.xiwenteoh.bookstore.repository;

import com.xiwenteoh.bookstore.constant.EnumRole;
import com.xiwenteoh.bookstore.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleType(EnumRole roleType);
}
