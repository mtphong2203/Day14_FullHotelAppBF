package com.maiphong.hotelapp.dtos.order;

import com.maiphong.hotelapp.dtos.MasterCreateUpdateDTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreateEditDTO extends MasterCreateUpdateDTO {
    @NotNull(message = "Order is required name")
    private String name;

    @PositiveOrZero(message = "Greater or equal than zero")
    private double price;
}
