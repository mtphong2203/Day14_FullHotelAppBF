package com.maiphong.hotelapp.dtos.user;

import java.util.Set;

import com.maiphong.hotelapp.entities.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInformationDTO {
    private String firstName;

    private String lastName;

    private String displayName;

    private String username;

    private String email;

    private String phoneNumber;

    private Set<String> roles;
}
