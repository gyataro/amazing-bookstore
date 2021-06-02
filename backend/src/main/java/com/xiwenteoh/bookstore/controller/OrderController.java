package com.xiwenteoh.bookstore.controller;

import com.alibaba.fastjson.JSONArray;
import com.xiwenteoh.bookstore.entity.Order;
import com.xiwenteoh.bookstore.security.services.UserDetailsImpl;
import com.xiwenteoh.bookstore.security.services.UserDetailsServiceImpl;
import com.xiwenteoh.bookstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "/user")
    public String addOrder(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        Order order = orderService.addOrder(userDetails.getId());
        return JSONArray.toJSONString(order);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/user")
    public String findOrderByUser(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        List<Order> orders = orderService.findOrdersByUserId(userDetails.getId());
        return JSONArray.toJSONString(orders);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/user/search")
    public String findOrderByUserAndDate(
            HttpServletRequest request,
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String to
    ) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        Instant after = Instant.parse(from);
        Instant before = Instant.parse(to);

        List<Order> orders = orderService.findOrdersByUserIdAndTimestampBetween(userDetails.getId(), after, before);
        return JSONArray.toJSONString(orders);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/admin")
    public String findAll() {
        List<Order> orders = orderService.findAll();
        return JSONArray.toJSONString(orders);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/admin/search")
    public String findOrderByDate(
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String to
    ) {
        Instant after = Instant.parse(from);
        Instant before = Instant.parse(to);

        List<Order> orders = orderService.findOrdersByTimestampBetween(after, before);
        return JSONArray.toJSONString(orders);
    }
}
