package com.maiphong.hotelapp.entities;

import java.time.ZonedDateTime;

import org.hibernate.annotations.TimeZoneStorage;
import org.hibernate.annotations.TimeZoneStorageType;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class MasterEntityBase extends EntityBase {
    @TimeZoneStorage(TimeZoneStorageType.NATIVE)
    @Column(columnDefinition = "DATETIMEOFFSET", nullable = false)
    private ZonedDateTime insertedAt;

    @TimeZoneStorage(TimeZoneStorageType.NATIVE)
    @Column(columnDefinition = "DATETIMEOFFSET")
    private ZonedDateTime updatedAt;

    @TimeZoneStorage(TimeZoneStorageType.NATIVE)
    @Column(columnDefinition = "DATETIMEOFFSET")
    private ZonedDateTime deletedAt;

    @Column(nullable = false)
    private boolean isActive;

    @PrePersist
    public void prePersis() {
        this.insertedAt = ZonedDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = ZonedDateTime.now();
    }
}
