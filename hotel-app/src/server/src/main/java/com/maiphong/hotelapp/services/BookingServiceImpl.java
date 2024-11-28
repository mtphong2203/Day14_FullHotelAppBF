package com.maiphong.hotelapp.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maiphong.hotelapp.dtos.booking.BookingCreateUpdate;
import com.maiphong.hotelapp.dtos.booking.BookingDTO;
import com.maiphong.hotelapp.entities.Booking;
import com.maiphong.hotelapp.exceptions.ResourceNotFoundException;
import com.maiphong.hotelapp.mappers.BookingMapper;
import com.maiphong.hotelapp.repositories.BookingRepository;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;

    public BookingServiceImpl(BookingRepository bookingRepository, BookingMapper bookingMapper) {
        this.bookingRepository = bookingRepository;
        this.bookingMapper = bookingMapper;
    }

    @Override
    public List<BookingDTO> getAll() {
        List<Booking> bookings = bookingRepository.findAll();

        List<BookingDTO> bookingDTOs = bookings.stream().map(booking -> {
            BookingDTO bookingDTO = bookingMapper.toBookingDTO(booking);
            return bookingDTO;
        }).toList();

        return bookingDTOs;
    }

    @Override
    public BookingDTO getById(UUID id) {
        Booking booking = bookingRepository.findById(id).orElse(null);

        if (booking == null) {
            throw new ResourceNotFoundException("Booking is not found");
        }
        BookingDTO bookingDTO = bookingMapper.toBookingDTO(booking);

        return bookingDTO;

    }

    @Override
    public boolean create(BookingCreateUpdate bookingCreateUpdate) {
        if (bookingCreateUpdate == null) {
            throw new IllegalArgumentException("Can not null");
        }

        Booking booking = bookingMapper.toBooking(bookingCreateUpdate);
        booking.setBookingDate(LocalDateTime.now());
        booking = bookingRepository.save(booking);

        return booking != null;
    }

    @Override
    public boolean update(UUID id, BookingCreateUpdate bookingCreateUpdate) {
        if (bookingCreateUpdate == null) {
            throw new IllegalArgumentException("Can not null");
        }

        Booking booking = bookingRepository.findById(id).orElse(null);

        if (booking == null) {
            throw new ResourceNotFoundException("Booking is not found");
        }

        bookingMapper.toBooking(bookingCreateUpdate, booking);

        booking = bookingRepository.save(booking);

        return booking != null;
    }

    @Override
    public boolean delete(UUID id) {
        Booking booking = bookingRepository.findById(id).orElse(null);

        if (booking == null) {
            throw new ResourceNotFoundException("Booking is not found");
        }

        bookingRepository.delete(booking);

        return !bookingRepository.existsById(id);
    }
}
