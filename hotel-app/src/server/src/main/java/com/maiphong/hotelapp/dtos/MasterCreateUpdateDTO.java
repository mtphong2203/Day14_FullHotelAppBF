package com.maiphong.hotelapp.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MasterCreateUpdateDTO {
    @NotNull(message = "Active is required")
    private boolean isActive;
}
