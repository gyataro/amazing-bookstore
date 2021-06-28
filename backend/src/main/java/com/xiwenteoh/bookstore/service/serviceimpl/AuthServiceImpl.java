package com.xiwenteoh.bookstore.service.serviceimpl;

import com.xiwenteoh.bookstore.constant.EnumRole;
import com.xiwenteoh.bookstore.dao.RoleDao;
import com.xiwenteoh.bookstore.dao.UserDao;
import com.xiwenteoh.bookstore.dto.request.LoginRequest;
import com.xiwenteoh.bookstore.dto.request.RegisterRequest;
import com.xiwenteoh.bookstore.dto.resource.JwtResource;
import com.xiwenteoh.bookstore.entity.Role;
import com.xiwenteoh.bookstore.entity.User;
import com.xiwenteoh.bookstore.security.jwt.JwtUtils;
import com.xiwenteoh.bookstore.security.services.UserDetailsImpl;
import com.xiwenteoh.bookstore.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    UserDao userDao;

    @Autowired
    RoleDao roleDao;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Override
    public JwtResource register(RegisterRequest registerRequest) {
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());

        Set<Role> roles = roleDao.findByRoleType(EnumRole.ROLE_USER);
        user.setRoles(roles);
        userDao.saveAndFlush(user);

        return getJwtResource(user.getUsername(), user.getPassword());
    }

    @Override
    public JwtResource login(LoginRequest loginRequest) {
        return getJwtResource(loginRequest.getUsername(), loginRequest.getPassword());
    }

    /* [FUNCTION]: Authenticate user based on username, password; Returns JWT token */
    private JwtResource getJwtResource(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        if(roles.contains("ROLE_BANNED")) {
            throw new DisabledException("Banned");
        }

        return new JwtResource(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
        );
    }
}
