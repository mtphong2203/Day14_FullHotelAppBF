package com.maiphong.hotelapp.entities;

import java.time.ZonedDateTime;

import org.hibernate.annotations.TimeZoneStorage;
import org.hibernate.annotations.TimeZoneStorageType;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "bookings")
public class Booking extends MasterEntityBase {

    @TimeZoneStorage(TimeZoneStorageType.NATIVE)
    @Column(columnDefinition = "DATETIMEOFFSET", nullable = false)
    private ZonedDateTime bookingDate;

    @TimeZoneStorage(TimeZoneStorageType.NATIVE)
    @Column(columnDefinition = "DATETIMEOFFSET", nullable = false)
    private ZonedDateTime checkInDate;

    @TimeZoneStorage(TimeZoneStorageType.NATIVE)
    @Column(columnDefinition = "DATETIMEOFFSET", nullable = false)
    private ZonedDateTime checkOutDate;

    @Column(nullable = false)
    private BookingStatus status;

    @PrePersist
    public void prePersist() {
        this.bookingDate = ZonedDateTime.now();
    }

}
