package com.maiphong.hotelapp.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "rooms")
public class Room extends MasterEntityBase {

    @Column(columnDefinition = "NVARCHAR(255)", nullable = false, unique = true)
    private String number;

    private RoomType type;

    private int capacity;

    private double price;

}
