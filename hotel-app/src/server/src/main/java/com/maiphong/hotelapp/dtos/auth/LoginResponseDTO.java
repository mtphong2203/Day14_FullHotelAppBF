package com.maiphong.hotelapp.dtos.auth;

import com.maiphong.hotelapp.dtos.user.UserInformationDTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private String accessToken;

    private UserInformationDTO userInformationDTO;
}
