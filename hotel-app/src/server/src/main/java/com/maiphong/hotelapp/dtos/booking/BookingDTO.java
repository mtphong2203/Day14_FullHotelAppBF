package com.maiphong.hotelapp.dtos.booking;

import java.time.LocalDateTime;
import java.util.UUID;

import com.maiphong.hotelapp.entities.BookingStatus;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private UUID id;

    private LocalDateTime bookingDate;

    private LocalDateTime checkInDate;

    private LocalDateTime checkOutDate;

    private BookingStatus status;
}
