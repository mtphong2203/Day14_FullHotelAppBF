package com.maiphong.hotelapp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.maiphong.hotelapp.dtos.booking.BookingCreateUpdate;
import com.maiphong.hotelapp.dtos.booking.BookingDTO;
import com.maiphong.hotelapp.entities.Booking;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    Booking toBooking(BookingCreateUpdate bookingCreateUpdate);

    Booking toBooking(BookingCreateUpdate bookingCreateUpdate, @MappingTarget Booking booking);

    BookingDTO toBookingDTO(Booking booking);
}
