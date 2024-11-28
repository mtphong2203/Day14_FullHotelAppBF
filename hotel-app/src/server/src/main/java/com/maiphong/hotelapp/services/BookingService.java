package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import com.maiphong.hotelapp.dtos.booking.BookingCreateUpdate;
import com.maiphong.hotelapp.dtos.booking.BookingDTO;

public interface BookingService {
    List<BookingDTO> getAll();

    BookingDTO getById(UUID id);

    boolean create(BookingCreateUpdate bookingCreateUpdate);

    boolean update(UUID id, BookingCreateUpdate bookingCreateUpdate);

    boolean delete(UUID id);

}
