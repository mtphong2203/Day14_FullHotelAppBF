package com.maiphong.hotelapp.entities;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "room_number", columnDefinition = "NVARCHAR(255)", nullable = false, unique = true)
    private String number;

    private RoomType type;

    private int capacity;

    private double price;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private boolean isActive;

}
