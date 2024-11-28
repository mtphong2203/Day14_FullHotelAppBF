package com.maiphong.hotelapp.dtos.user;

import java.util.UUID;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private UUID id;

    private String firstName;

    private String lastName;

    private String username;

    private String phoneNumber;

    private String email;

    private boolean isActive;
}
