package com.maiphong.hotelapp.dtos.room;

import java.util.UUID;

import com.maiphong.hotelapp.dtos.BaseDTO;
import com.maiphong.hotelapp.entities.RoomType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO extends BaseDTO {

    private String number;

    private RoomType type;

    private int capacity;

    private double price;

}
