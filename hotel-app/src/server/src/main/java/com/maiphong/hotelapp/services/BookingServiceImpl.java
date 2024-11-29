package com.maiphong.hotelapp.services;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maiphong.hotelapp.dtos.booking.BookingCreateUpdate;
import com.maiphong.hotelapp.dtos.booking.BookingMasterDTO;
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
    public List<BookingMasterDTO> getAll() {
        List<Booking> bookings = bookingRepository.findAll();

        List<BookingMasterDTO> bookingDTOs = bookings.stream().map(booking -> {
            BookingMasterDTO bookingDTO = bookingMapper.toMasterDTO(booking);
            return bookingDTO;
        }).toList();

        return bookingDTOs;
    }

    @Override
    public BookingMasterDTO getById(String id) {
        Booking booking = bookingRepository.findById(UUID.fromString(id)).orElse(null);

        if (booking == null) {
            throw new ResourceNotFoundException("Booking is not found");
        }
        BookingMasterDTO bookingDTO = bookingMapper.toMasterDTO(booking);

        return bookingDTO;

    }

    @Override
    public BookingMasterDTO create(BookingCreateUpdate bookingDTO) {
        if (bookingDTO == null) {
            throw new IllegalArgumentException("Can not null");
        }

        Booking booking = bookingMapper.toEntity(bookingDTO);

        booking = bookingRepository.save(booking);

        BookingMasterDTO masterDTO = bookingMapper.toMasterDTO(booking);

        return masterDTO;
    }

    @Override
    public BookingMasterDTO update(UUID id, BookingCreateUpdate bookingDTO) {
        if (bookingDTO == null) {
            throw new IllegalArgumentException("Can not null");
        }
        Booking booking = bookingRepository.findById(id).orElse(null);

        if (booking == null) {
            throw new ResourceNotFoundException("Booking is not exist!");
        }

        bookingMapper.toEntity(bookingDTO, booking);

        booking = bookingRepository.save(booking);

        BookingMasterDTO masterDTO = bookingMapper.toMasterDTO(booking);

        return masterDTO;
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
