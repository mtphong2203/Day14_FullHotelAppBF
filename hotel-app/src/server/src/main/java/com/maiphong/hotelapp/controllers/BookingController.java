package com.maiphong.hotelapp.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maiphong.hotelapp.dtos.booking.BookingCreateUpdate;
import com.maiphong.hotelapp.dtos.booking.BookingDTO;
import com.maiphong.hotelapp.services.BookingService;

@RestController
@RequestMapping("api/manager/booking")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAll() {
        List<BookingDTO> bookingDTOs = bookingService.getAll();

        if (bookingDTOs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(bookingDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> getById(@PathVariable UUID id) {
        BookingDTO bookingDTO = bookingService.getById(id);

        if (bookingDTO == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(bookingDTO);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookingCreateUpdate bookingCreateUpdateDTO) {
        boolean isCreated = bookingService.create(bookingCreateUpdateDTO);

        if (!isCreated) {
            return ResponseEntity.badRequest().body(isCreated);
        }

        return ResponseEntity.status(201).body(isCreated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody BookingCreateUpdate bookingCreateUpdateDTO) {
        boolean isUpdated = bookingService.update(id, bookingCreateUpdateDTO);

        if (!isUpdated) {
            return ResponseEntity.badRequest().body(isUpdated);
        }

        return ResponseEntity.ok(isUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        boolean isDeleted = bookingService.delete(id);

        if (!isDeleted) {
            return ResponseEntity.badRequest().body(isDeleted);
        }

        return ResponseEntity.ok(isDeleted);
    }

}
