package com.xiwenteoh.bookstore.controller;

import com.alibaba.fastjson.JSONArray;
import com.xiwenteoh.bookstore.entity.Cart;
import com.xiwenteoh.bookstore.dto.request.CartRequest;
import com.xiwenteoh.bookstore.security.services.UserDetailsImpl;
import com.xiwenteoh.bookstore.security.services.UserDetailsServiceImpl;
import com.xiwenteoh.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "")
    public String findCartByUser(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        Cart cart = cartService.findCartByUserId(userDetails.getId());
        return JSONArray.toJSONString(cart);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value = "")
    public void deleteCart(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        cartService.deleteCart(userDetails.getId());
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "/item")
    public String addCartitem(HttpServletRequest request, @RequestBody CartRequest cartRequest) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        Cart cart = cartService.addCartItem(userDetails.getId(), cartRequest.getBookId(), cartRequest.getQuantity());
        return JSONArray.toJSONString(cart);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping(value = "/item")
    public String updateCartitem(HttpServletRequest request, @RequestBody CartRequest cartRequest) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        Cart cart = cartService.updateCartItem(userDetails.getId(), cartRequest.getBookId(), cartRequest.getQuantity());
        return JSONArray.toJSONString(cart);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value = "/item")
    public void deleteCartitem(HttpServletRequest request, @RequestBody CartRequest cartRequest) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        cartService.deleteCartItem(userDetails.getId(), cartRequest.getBookId());
    }
}
