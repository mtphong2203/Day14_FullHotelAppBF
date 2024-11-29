package com.maiphong.hotelapp.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order extends MasterEntityBase {

    @Column(nullable = false, unique = true, columnDefinition = "NVARCHAR(255)")
    private String name;

    private double price;

}
