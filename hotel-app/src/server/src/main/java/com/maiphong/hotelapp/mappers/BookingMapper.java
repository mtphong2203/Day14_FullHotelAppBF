package com.maiphong.hotelapp.mappers;

import org.mapstruct.*;

import com.maiphong.hotelapp.dtos.booking.BookingCreateUpdate;
import com.maiphong.hotelapp.dtos.booking.BookingDTO;
import com.maiphong.hotelapp.dtos.booking.BookingMasterDTO;
import com.maiphong.hotelapp.entities.Booking;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BookingMapper {

    Booking toEntity(BookingCreateUpdate DTO);

    Booking toEntity(BookingCreateUpdate DTO, @MappingTarget Booking entity);

    BookingDTO toDTO(Booking entity);

    BookingMasterDTO toMasterDTO(Booking entity);

}
