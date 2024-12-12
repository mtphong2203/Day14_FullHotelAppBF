package com.maiphong.hotelapp.dtos.auth;

import java.util.List;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {
    private String accessToken;

    private List<String> roles;
}
