package com.maiphong.hotelapp.dtos.booking;

import java.time.LocalDateTime;

import com.maiphong.hotelapp.entities.BookingStatus;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingCreateUpdate {

    @NotNull(message = "Check in date should not null")
    private LocalDateTime checkInDate;

    @NotNull(message = "Check out date should not null")
    private LocalDateTime checkOutDate;

    private BookingStatus status;
}
