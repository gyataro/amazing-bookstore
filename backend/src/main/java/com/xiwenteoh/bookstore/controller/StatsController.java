package com.xiwenteoh.bookstore.controller;

import com.xiwenteoh.bookstore.dto.resource.StatResource;
import com.xiwenteoh.bookstore.dto.response.Response;
import com.xiwenteoh.bookstore.entity.Stats.OrderStatProjection;
import com.xiwenteoh.bookstore.entity.Stats.SalesStatProjection;
import com.xiwenteoh.bookstore.entity.Stats.UserStatProjection;
import com.xiwenteoh.bookstore.security.services.UserDetailsImpl;
import com.xiwenteoh.bookstore.security.services.UserDetailsServiceImpl;
import com.xiwenteoh.bookstore.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.time.Instant;

@RestController
@RequestMapping("/api/stats/")
public class StatsController {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    StatsService statsService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/order")
    public ResponseEntity<?> getStat1(
            HttpServletRequest request,
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String to
    ) {
        Principal principal = request.getUserPrincipal();
        UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(principal.getName());

        Instant fromInstant = Instant.parse(from);
        Instant toInstant = Instant.parse(to);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        statsService.findOrderStatistics(userDetails.getId(), fromInstant, toInstant)
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/sales")
    public ResponseEntity<?> getSalesStats(
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String to
    ) {
        Instant fromInstant = Instant.parse(from);
        Instant toInstant = Instant.parse(to);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        statsService.findSalesStatistics(fromInstant, toInstant)
                ),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping(value = "/users")
    public ResponseEntity<?> getUsersStats(
            @RequestParam("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String from,
            @RequestParam("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) String to
    ) {
        Instant fromInstant = Instant.parse(from);
        Instant toInstant = Instant.parse(to);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.success,
                        statsService.findUserStatistics(fromInstant, toInstant)
                ),
                HttpStatus.OK
        );
    }
}
