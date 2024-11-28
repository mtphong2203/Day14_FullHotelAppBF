package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maiphong.hotelapp.dtos.order.OrderCreateEditDTO;
import com.maiphong.hotelapp.dtos.order.OrderDTO;
import com.maiphong.hotelapp.entities.Order;
import com.maiphong.hotelapp.exceptions.ResourceNotFoundException;
import com.maiphong.hotelapp.mappers.OrderMapper;
import com.maiphong.hotelapp.repositories.OrderRepository;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public OrderServiceImpl(OrderRepository orderRepository, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    @Override
    public List<OrderDTO> getAll() {
        List<Order> orders = orderRepository.findAll();

        List<OrderDTO> orderDTOs = orders.stream().map(order -> {
            OrderDTO orderDTO = orderMapper.toOrderDTO(order);
            return orderDTO;
        }).toList();

        return orderDTOs;
    }

    @Override
    public OrderDTO getById(UUID id) {
        Order order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            throw new ResourceNotFoundException("Order is not found");
        }
        OrderDTO orderDTO = orderMapper.toOrderDTO(order);

        return orderDTO;
    }

    @Override
    public Page<OrderDTO> search(String name, Pageable pageable) {
        Specification<Order> spec = (root, query, cb) -> {
            if (name == null) {
                return null;
            }

            return cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        };

        Page<Order> orders = orderRepository.findAll(spec, pageable);

        Page<OrderDTO> orderDTOs = orders.map(order -> {
            OrderDTO orderDTO = orderMapper.toOrderDTO(order);
            return orderDTO;
        });

        return orderDTOs;
    }

    @Override
    public boolean create(OrderCreateEditDTO orderCreateEditDTO) {
        if (orderCreateEditDTO == null) {
            throw new IllegalArgumentException("Order create can not null");
        }

        Order order = orderMapper.toOrder(orderCreateEditDTO);

        order = orderRepository.save(order);

        return order != null;
    }

    @Override
    public boolean update(UUID id, OrderCreateEditDTO orderCreateEditDTO) {
        if (orderCreateEditDTO == null) {
            throw new IllegalArgumentException("Order create can not null");
        }

        Order order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            throw new ResourceNotFoundException("Order is not found");
        }

        orderMapper.toOrder(orderCreateEditDTO, order);

        order = orderRepository.save(order);

        return order != null;
    }

    @Override
    public boolean delete(UUID id) {
        Order order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            throw new ResourceNotFoundException("Order is not found");
        }

        orderRepository.delete(order);

        return !orderRepository.existsById(id);

    }
}
