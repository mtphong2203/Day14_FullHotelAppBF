package com.maiphong.hotelapp.dtos.order;

import com.maiphong.hotelapp.dtos.MasterDTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderMasterDTO extends MasterDTO {
    private String name;

    private double price;

}
