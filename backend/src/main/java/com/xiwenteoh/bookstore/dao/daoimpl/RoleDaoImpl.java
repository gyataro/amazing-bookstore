package com.xiwenteoh.bookstore.dao.daoimpl;

import com.xiwenteoh.bookstore.constant.EnumRole;
import com.xiwenteoh.bookstore.dao.RoleDao;
import com.xiwenteoh.bookstore.entity.Role;
import com.xiwenteoh.bookstore.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public class RoleDaoImpl implements RoleDao {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public Set<Role> findByRoleType(EnumRole roleType) {
        return roleRepository.findByRoleType(roleType);
    }
}
