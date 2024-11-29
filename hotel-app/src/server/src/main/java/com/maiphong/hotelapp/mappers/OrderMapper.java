package com.maiphong.hotelapp.mappers;

import org.mapstruct.*;

import com.maiphong.hotelapp.dtos.order.OrderCreateEditDTO;
import com.maiphong.hotelapp.dtos.order.OrderDTO;
import com.maiphong.hotelapp.dtos.order.OrderMasterDTO;
import com.maiphong.hotelapp.entities.Order;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    Order toEntity(OrderCreateEditDTO DTO);

    Order toEntity(OrderCreateEditDTO DTO, @MappingTarget Order entity);

    OrderDTO toDTO(Order entity);

    OrderMasterDTO toMasterDTO(Order entity);
}
