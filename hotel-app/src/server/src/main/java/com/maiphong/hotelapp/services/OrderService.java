package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.maiphong.hotelapp.dtos.order.OrderCreateEditDTO;
import com.maiphong.hotelapp.dtos.order.OrderMasterDTO;

public interface OrderService {
    List<OrderMasterDTO> getAll();

    List<OrderMasterDTO> searchByName(String keyword);

    Page<OrderMasterDTO> searchPage(String keyword, Pageable pageable);

    OrderMasterDTO getById(String id);

    OrderMasterDTO create(OrderCreateEditDTO orderDTO);

    OrderMasterDTO update(UUID id, OrderCreateEditDTO orderDTO);

    boolean delete(UUID id);
}
