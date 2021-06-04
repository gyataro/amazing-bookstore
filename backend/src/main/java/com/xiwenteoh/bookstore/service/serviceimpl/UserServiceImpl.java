package com.xiwenteoh.bookstore.service.serviceimpl;

import com.xiwenteoh.bookstore.constant.EnumRole;
import com.xiwenteoh.bookstore.dao.RoleDao;
import com.xiwenteoh.bookstore.dao.UserDao;
import com.xiwenteoh.bookstore.entity.Role;
import com.xiwenteoh.bookstore.entity.User;
import com.xiwenteoh.bookstore.exception.custom.UserNotFoundException;
import com.xiwenteoh.bookstore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;

    @Autowired
    RoleDao roleDao;

    @Override
    public void ban(Long userId) {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        Set<Role> roles = roleDao.findByRoleType(EnumRole.ROLE_BANNED);
        user.setRoles(roles);
        userDao.saveAndFlush(user);
    }

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }
}
