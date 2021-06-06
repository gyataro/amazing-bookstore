package com.xiwenteoh.bookstore.controller;

import com.xiwenteoh.bookstore.dto.response.Response;
import com.xiwenteoh.bookstore.dto.request.CartRequest;
import com.xiwenteoh.bookstore.security.services.UserDetailsImpl;
import com.xiwenteoh.bookstore.security.services.UserDetailsServiceImpl;
import com.xiwenteoh.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> findCartByUser(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        cartService.findCartByUserId(userDetails.getId())
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value = "")
    public ResponseEntity<?> deleteCart(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        cartService.deleteCart(userDetails.getId());

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        null
                ),
                HttpStatus.NO_CONTENT
        );
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "/item")
    public ResponseEntity<?> addCartitem(HttpServletRequest request, @RequestBody CartRequest cartRequest) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        cartService.addCartItem(userDetails.getId(), cartRequest)
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping(value = "/item")
    public ResponseEntity<?> updateCartitem(HttpServletRequest request, @RequestBody CartRequest cartRequest) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        cartService.updateCartItem(userDetails.getId(), cartRequest)
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value = "/item/{bookId}")
    public ResponseEntity<?> deleteCartitem(HttpServletRequest request, @PathVariable Integer bookId) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        cartService.deleteCartItem(userDetails.getId(), bookId)
                ),
                HttpStatus.OK
        );
    }
}
