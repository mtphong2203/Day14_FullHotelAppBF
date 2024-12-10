package com.maiphong.hotelapp.dtos.room;

import com.maiphong.hotelapp.dtos.MasterDTO;
import com.maiphong.hotelapp.entities.RoomType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomMasterDTO extends MasterDTO {

    private String number;

    private RoomType type;

    private int capacity;

    private double price;

}
