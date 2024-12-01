package com.maiphong.hotelapp.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maiphong.hotelapp.dtos.booking.BookingCreateUpdate;
import com.maiphong.hotelapp.dtos.booking.BookingMasterDTO;
import com.maiphong.hotelapp.services.BookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final PagedResourcesAssembler<BookingMasterDTO> pageResource;

    public BookingController(BookingService bookingService, PagedResourcesAssembler<BookingMasterDTO> pageResource) {
        this.bookingService = bookingService;
        this.pageResource = pageResource;
    }

    @GetMapping
    public ResponseEntity<List<BookingMasterDTO>> getAll() {
        List<BookingMasterDTO> bookingDTOs = bookingService.getAll();
        return ResponseEntity.ok(bookingDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingMasterDTO> getById(@PathVariable String id) {
        BookingMasterDTO bookingDTO = bookingService.getById(id);
        return ResponseEntity.ok(bookingDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<List<BookingMasterDTO>> search(@RequestParam(required = false) String keyword) {
        var masterDTOs = bookingService.searchByBooking(keyword);
        return ResponseEntity.ok(masterDTOs);
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody BookingCreateUpdate bookingDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        var masterDTO = bookingService.create(bookingDTO);

        if (masterDTO == null) {
            return ResponseEntity.badRequest().body("Fail to create booking");
        }

        return ResponseEntity.status(201).body(masterDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @Valid @RequestBody BookingCreateUpdate bookingDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        var masterDTO = bookingService.update(id, bookingDTO);

        if (masterDTO == null) {
            return ResponseEntity.badRequest().body("Fail to update booking");
        }

        return ResponseEntity.ok(masterDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        boolean isDeleted = bookingService.delete(id);

        if (!isDeleted) {
            return ResponseEntity.badRequest().body("Fail to delete booking");
        }

        return ResponseEntity.ok(isDeleted);
    }

}
