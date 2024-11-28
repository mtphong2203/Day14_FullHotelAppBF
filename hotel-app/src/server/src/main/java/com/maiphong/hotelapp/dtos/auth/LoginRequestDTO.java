package com.maiphong.hotelapp.dtos.auth;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {
    private String username;

    private String password;
}
