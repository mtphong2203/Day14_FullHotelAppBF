package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maiphong.hotelapp.dtos.order.OrderCreateEditDTO;
import com.maiphong.hotelapp.dtos.order.OrderMasterDTO;
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
    public List<OrderMasterDTO> getAll() {
        List<Order> orders = orderRepository.findAll();

        List<OrderMasterDTO> orderDTOs = orders.stream().map(order -> {
            OrderMasterDTO orderDTO = orderMapper.toMasterDTO(order);
            return orderDTO;
        }).toList();

        return orderDTOs;
    }

    @Override
    public OrderMasterDTO getById(String id) {
        Order order = orderRepository.findById(UUID.fromString(id)).orElse(null);

        if (order == null) {
            throw new ResourceNotFoundException("Order is not found");
        }
        OrderMasterDTO orderDTO = orderMapper.toMasterDTO(order);

        return orderDTO;
    }

    @Override
    public Page<OrderMasterDTO> searchPage(String keyword, Pageable pageable) {
        Specification<Order> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }

            return cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
        };

        Page<Order> orders = orderRepository.findAll(spec, pageable);

        Page<OrderMasterDTO> orderDTOs = orders.map(order -> {
            OrderMasterDTO orderDTO = orderMapper.toMasterDTO(order);
            return orderDTO;
        });

        return orderDTOs;
    }

    @Override
    public List<OrderMasterDTO> searchByName(String keyword) {
        Specification<Order> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }

            return cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
        };

        List<Order> orders = orderRepository.findAll(spec);

        List<OrderMasterDTO> orderDTOs = orders.stream().map(order -> {
            OrderMasterDTO orderDTO = orderMapper.toMasterDTO(order);
            return orderDTO;
        }).toList();

        return orderDTOs;
    }

    @Override
    public OrderMasterDTO create(OrderCreateEditDTO orderDTO) {
        if (orderDTO == null) {
            throw new IllegalArgumentException("Order create can not null");
        }

        Order existOrder = orderRepository.findByName(orderDTO.getName());

        if (existOrder != null) {
            throw new IllegalArgumentException("Order is already exist!");
        }

        Order order = orderMapper.toEntity(orderDTO);

        order = orderRepository.save(order);

        OrderMasterDTO masterDTO = orderMapper.toMasterDTO(order);

        return masterDTO;
    }

    @Override
    public OrderMasterDTO update(UUID id, OrderCreateEditDTO orderDTO) {
        if (orderDTO == null) {
            throw new IllegalArgumentException("Order create can not null");
        }

        Order order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            throw new ResourceNotFoundException("Order is not found");
        }

        orderMapper.toEntity(orderDTO, order);

        order = orderRepository.save(order);

        OrderMasterDTO masterDTO = orderMapper.toMasterDTO(order);

        return masterDTO;
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
