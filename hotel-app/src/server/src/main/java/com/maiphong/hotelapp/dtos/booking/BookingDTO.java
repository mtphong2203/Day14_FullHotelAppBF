package com.maiphong.hotelapp.dtos.booking;

import java.time.ZonedDateTime;

import com.maiphong.hotelapp.dtos.BaseDTO;
import com.maiphong.hotelapp.dtos.MasterDTO;
import com.maiphong.hotelapp.entities.BookingStatus;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO extends BaseDTO {

    private ZonedDateTime bookingDate;

    private ZonedDateTime checkInDate;

    private ZonedDateTime checkOutDate;

    private BookingStatus status;
}
