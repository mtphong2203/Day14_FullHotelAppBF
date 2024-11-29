package com.maiphong.hotelapp.dtos.booking;

import java.time.ZonedDateTime;

import com.maiphong.hotelapp.dtos.MasterCreateUpdateDTO;
import com.maiphong.hotelapp.entities.BookingStatus;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingCreateUpdate extends MasterCreateUpdateDTO {

    @NotNull(message = "Check in date should not null")
    private ZonedDateTime checkInDate;

    @NotNull(message = "Check out date should not null")
    private ZonedDateTime checkOutDate;

    private BookingStatus status;
}
