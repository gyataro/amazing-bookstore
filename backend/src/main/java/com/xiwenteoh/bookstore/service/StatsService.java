package com.xiwenteoh.bookstore.service;

import com.xiwenteoh.bookstore.dto.resource.StatResource;

import java.time.Instant;

public interface StatsService {
    StatResource<?> findOrderStatistics(Long userId, Instant from, Instant to);
    StatResource<?> findSalesStatistics(Instant from, Instant to);
    StatResource<?> findUserStatistics(Instant from, Instant to);
}
