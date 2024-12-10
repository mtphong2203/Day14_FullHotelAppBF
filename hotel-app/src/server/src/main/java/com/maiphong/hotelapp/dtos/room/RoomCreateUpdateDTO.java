package com.maiphong.hotelapp.dtos.room;

import org.hibernate.validator.constraints.Length;

import com.maiphong.hotelapp.dtos.MasterCreateUpdateDTO;
import com.maiphong.hotelapp.entities.RoomType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreateUpdateDTO extends MasterCreateUpdateDTO {

    @NotBlank(message = "Room number is required")
    @Length(min = 2, max = 255, message = "Between 2 to 255 characters")
    private String number;

    @NotNull(message = "Type is required")
    private RoomType type;

    @NotNull(message = "Capacity is required")
    @PositiveOrZero(message = "Should greater or equal zero")
    private int capacity;

    @PositiveOrZero(message = "Should greater or equal zero")
    private double price;
}
