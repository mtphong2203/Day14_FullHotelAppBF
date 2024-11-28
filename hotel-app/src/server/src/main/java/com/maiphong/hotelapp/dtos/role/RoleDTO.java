package com.maiphong.hotelapp.dtos.role;

import java.util.UUID;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDTO {
    private UUID id;

    private String name;

    private String description;
}
