package com.maiphong.hotelapp.dtos.order;

import java.util.UUID;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private UUID id;

    private String name;

    private double price;
}
