package com.maiphong.hotelapp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.maiphong.hotelapp.dtos.order.OrderCreateEditDTO;
import com.maiphong.hotelapp.dtos.order.OrderDTO;
import com.maiphong.hotelapp.entities.Order;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    Order toOrder(OrderCreateEditDTO orderCreateEditDTO);

    Order toOrder(OrderCreateEditDTO orderCreateEditDTO, @MappingTarget Order order);

    OrderDTO toOrderDTO(Order order);

}
