package com.maiphong.hotelapp.dtos.auth;

import org.hibernate.validator.constraints.Length;

import com.maiphong.hotelapp.dtos.MasterCreateUpdateDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO extends MasterCreateUpdateDTO {
    @NotBlank(message = "First Name is required")
    @Length(min = 2, max = 50, message = "First Name must be between 2 and 50 characters")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    @Length(min = 2, max = 50, message = "Last Name must be between 2 and 50 characters")
    private String lastName;

    @NotBlank(message = "Username is required")
    @Length(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Length(min = 6, max = 50, message = "Email must be between 6 and 50 characters")
    private String email;

    @NotBlank(message = "Phone Number is required")
    @Length(min = 10, max = 20, message = "Phone Number must be between 10 and 20 characters")
    private String phoneNumber;

    @NotBlank(message = "Password is required")
    @Length(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
    private String password;

    @NotBlank(message = "Confirm password is required")
    @Length(min = 8, max = 20, message = "Confirm password must be between 8 and 20 characters")
    private String confirmPassword;
}
