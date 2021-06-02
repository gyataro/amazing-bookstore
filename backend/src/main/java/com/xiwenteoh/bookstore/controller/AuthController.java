package com.xiwenteoh.bookstore.controller;

import com.xiwenteoh.bookstore.constant.EnumRole;
import com.xiwenteoh.bookstore.entity.Role;
import com.xiwenteoh.bookstore.entity.User;
import com.xiwenteoh.bookstore.dto.request.RegisterRequest;
import com.xiwenteoh.bookstore.dto.response.JwtResponse;
import com.xiwenteoh.bookstore.dto.request.LoginRequest;
import com.xiwenteoh.bookstore.dto.response.MessageResponse;
import com.xiwenteoh.bookstore.repository.RoleRepository;
import com.xiwenteoh.bookstore.repository.UserRepository;
import com.xiwenteoh.bookstore.security.jwt.JwtUtils;
import com.xiwenteoh.bookstore.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterRequest registerRequest) {

        if(userRepository.existsByUsernameOrEmail(
                registerRequest.getUsername(),
                registerRequest.getEmail()
        )) {
            return ResponseEntity.ok(new MessageResponse("Username / email already taken"));
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());

        Set<Role> roles = roleRepository.findByRoleType(EnumRole.ROLE_USER);
        user.setRoles(roles);
        userRepository.saveAndFlush(user);

        return ResponseEntity.ok(new MessageResponse("Success"));
    }
}
