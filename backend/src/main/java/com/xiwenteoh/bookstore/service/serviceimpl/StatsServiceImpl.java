package com.xiwenteoh.bookstore.service.serviceimpl;

import com.xiwenteoh.bookstore.dao.OrderItemDao;
import com.xiwenteoh.bookstore.dto.resource.StatResource;
import com.xiwenteoh.bookstore.entity.Stats.OrderStatProjection;
import com.xiwenteoh.bookstore.entity.Stats.SalesStatProjection;
import com.xiwenteoh.bookstore.entity.Stats.UserStatProjection;
import com.xiwenteoh.bookstore.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class StatsServiceImpl implements StatsService {
    @Autowired
    OrderItemDao orderItemDao;

    @Override
    public StatResource<?> findOrderStatistics(Long userId, Instant from, Instant to) {
        List<OrderStatProjection> result = orderItemDao.findOrderStatistics(userId, from, to);
        OrderStatProjection summary = result.remove(result.size() - 1);

        return new StatResource<>(
                result,
                summary.getQuantity(),
                summary.getSubtotal()
        );
    }

    @Override
    public StatResource<?> findSalesStatistics(Instant from, Instant to) {
        List<SalesStatProjection> result = orderItemDao.findSalesStatistics(from, to);
        SalesStatProjection summary = result.remove(result.size() - 1);

        return new StatResource<>(
                result,
                summary.getQuantity(),
                summary.getSubtotal()
        );
    }

    @Override
    public StatResource<?> findUserStatistics(Instant from, Instant to) {
        List<UserStatProjection> result = orderItemDao.findUserStatistics(from, to);
        UserStatProjection summary = result.remove(result.size() - 1);

        return new StatResource<>(
                result,
                summary.getQuantity(),
                summary.getSubtotal()
        );
    }
}
