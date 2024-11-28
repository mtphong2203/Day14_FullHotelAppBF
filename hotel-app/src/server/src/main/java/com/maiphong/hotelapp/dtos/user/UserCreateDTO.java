package com.maiphong.hotelapp.dtos.user;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateDTO {
    private String firstName;

    private String lastName;

    @NotNull(message = "Username can not be null")
    @Length(max = 20, message = "Maximum is 20 characters")
    private String username;

    private String phoneNumber;

    private String email;

    @NotNull(message = "Password is required")
    private String password;

    @NotNull(message = "Password is required")
    private String confirmPassword;

    private boolean isActive;
}
