package com.maiphong.hotelapp.dtos.order;

import com.maiphong.hotelapp.dtos.BaseDTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO extends BaseDTO {
    private String name;

    private double price;
}
