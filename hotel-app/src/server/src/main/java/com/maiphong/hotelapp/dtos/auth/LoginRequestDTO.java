package com.maiphong.hotelapp.dtos.auth;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {
    @NotBlank(message = "Username should not contain blank")
    @Length(min = 5, max = 25, message = "Length between 5 to 25 characters")
    private String username;

    @NotBlank(message = "Password should not contain blank")
    @Length(min = 5, max = 30, message = "Length between 5 to 30 characters")
    private String password;
}
