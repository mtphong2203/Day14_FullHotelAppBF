package com.maiphong.hotelapp.dtos.booking;

import java.time.ZonedDateTime;

import com.maiphong.hotelapp.dtos.MasterDTO;
import com.maiphong.hotelapp.entities.BookingStatus;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingMasterDTO extends MasterDTO {

    private ZonedDateTime bookingDate;

    private ZonedDateTime checkInDate;

    private ZonedDateTime checkOutDate;

    private BookingStatus status;
}
