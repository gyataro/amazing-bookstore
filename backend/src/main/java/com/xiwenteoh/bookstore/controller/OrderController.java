package com.xiwenteoh.bookstore.controller;

import com.xiwenteoh.bookstore.dto.response.Response;
import com.xiwenteoh.bookstore.security.services.UserDetailsImpl;
import com.xiwenteoh.bookstore.security.services.UserDetailsServiceImpl;
import com.xiwenteoh.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.time.Instant;
import java.util.Objects;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;
    private final UserDetailsServiceImpl userDetailsService;

    public OrderController(
            OrderService orderService,
            UserDetailsServiceImpl userDetailsService
    ) {
        Objects.requireNonNull(orderService);
        Objects.requireNonNull(userDetailsService);
        this.orderService = orderService;
        this.userDetailsService = userDetailsService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "/user")
    public ResponseEntity<?> addOrder(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        orderService.addOrder(userDetails.getId())
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/user")
    public ResponseEntity<?> findOrderByUser(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        orderService.findOrdersByUserId(userDetails.getId())
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/user/search")
    public ResponseEntity<?> findOrderByUserAndDate(
            HttpServletRequest request,
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String to
    ) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        Instant after = Instant.parse(from);
        Instant before = Instant.parse(to);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        orderService.findOrdersByUserIdAndTimestampBetween(userDetails.getId(), after, before)
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/admin")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        orderService.findAll()
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/admin/search")
    public ResponseEntity<?> findOrderByDate(
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String to
    ) {
        Instant after = Instant.parse(from);
        Instant before = Instant.parse(to);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        orderService.findOrdersByTimestampBetween(after, before)
                ),
                HttpStatus.OK
        );
    }
}
