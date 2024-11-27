package com.maiphong.hotelapp.dtos.room;

import java.util.UUID;

import com.maiphong.hotelapp.entities.RoomType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {

    private UUID id;

    private String number;

    private RoomType type;

    private int capacity;

    private double price;
}
