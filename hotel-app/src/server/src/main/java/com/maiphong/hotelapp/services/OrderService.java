package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.maiphong.hotelapp.dtos.order.OrderCreateEditDTO;
import com.maiphong.hotelapp.dtos.order.OrderDTO;

public interface OrderService {
    List<OrderDTO> getAll();

    OrderDTO getById(UUID id);

    Page<OrderDTO> search(String name, Pageable pageable);

    boolean create(OrderCreateEditDTO orderCreateEditDTO);

    boolean update(UUID id, OrderCreateEditDTO orderCreateEditDTO);

    boolean delete(UUID id);
}
