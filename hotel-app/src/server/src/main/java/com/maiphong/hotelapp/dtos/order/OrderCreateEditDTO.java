package com.maiphong.hotelapp.dtos.order;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreateEditDTO {
    @NotNull(message = "Order is required name")
    private String name;

    @PositiveOrZero(message = "Greater or equal than zero")
    private double price;
}
