package com.xiwenteoh.bookstore.dao;

import com.xiwenteoh.bookstore.constant.EnumRole;
import com.xiwenteoh.bookstore.entity.Role;

import java.util.Set;

public interface RoleDao {
    Set<Role> findByRoleType(EnumRole roleType);
}
