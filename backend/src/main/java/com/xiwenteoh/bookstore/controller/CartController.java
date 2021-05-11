package com.xiwenteoh.bookstore.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.xiwenteoh.bookstore.entity.CartItem;
import com.xiwenteoh.bookstore.payload.response.MessageResponse;
import com.xiwenteoh.bookstore.security.services.UserDetailsImpl;
import com.xiwenteoh.bookstore.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "/add")
    public ResponseEntity<?> addItem(HttpServletRequest request, @RequestBody(required=false) CartItem cartItem) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());
        Long cartId = getCartId(userDetails.getId());
        jdbcTemplate.update(
                "INSERT INTO cart_item (cart_id, book_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?",
                cartId,
                cartItem.getBookId(),
                cartItem.getQuantity(),
                cartItem.getQuantity()
        );

        return ResponseEntity.ok(new MessageResponse(
                "Successfully added to cart"
        ));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "")
    public String getCart(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());
        Long cartId = getCartId(userDetails.getId());
        List<CartItem> result;

        result = jdbcTemplate.query(
                "SELECT * FROM cart_item NATURAL JOIN book WHERE cart_id = ?",
                (rs, rowNum) -> new CartItem(
                        rs.getLong("book_id"),
                        rs.getString("title"),
                        rs.getString("image_url"),
                        rs.getInt("quantity"),
                        rs.getBigDecimal("price")
                ),
                cartId
        );

        return JSON.toJSONString(result, SerializerFeature.BrowserCompatible);
    }

    public Long getCartId(Long userId) {
        Long cartId;

        try {
            cartId = jdbcTemplate.queryForObject(
                    "SELECT * FROM cart WHERE user_id = ? AND status_id = 0",
                    (rs, rowNum) -> rs.getLong("cart_id"),
                    userId
            );

        } catch(EmptyResultDataAccessException e) {
            GeneratedKeyHolder holder = new GeneratedKeyHolder();
            jdbcTemplate.update(con -> {
                PreparedStatement statement = con.prepareStatement("INSERT INTO cart (user_id, status_id) VALUES(?, 0)", Statement.RETURN_GENERATED_KEYS);
                statement.setLong(1, userId);
                return statement;
            }, holder);

            cartId = holder.getKey().longValue();
        }

        return cartId;
    }
}
