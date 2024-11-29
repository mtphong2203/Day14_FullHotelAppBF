package com.maiphong.hotelapp.dtos;

import java.time.ZonedDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MasterDTO extends BaseDTO {
    private ZonedDateTime insertedAt;

    private ZonedDateTime updatedAt;

    private ZonedDateTime deletedAt;

    private boolean isActive;
}
