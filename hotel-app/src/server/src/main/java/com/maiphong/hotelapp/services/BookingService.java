package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.maiphong.hotelapp.dtos.booking.BookingCreateUpdate;
import com.maiphong.hotelapp.dtos.booking.BookingMasterDTO;

public interface BookingService {
    List<BookingMasterDTO> getAll();

    BookingMasterDTO getById(String id);

    List<BookingMasterDTO> searchByBooking(String keyword);

    BookingMasterDTO create(BookingCreateUpdate bookingDTO);

    BookingMasterDTO update(UUID id, BookingCreateUpdate bookingDTO);

    boolean delete(UUID id);

}
