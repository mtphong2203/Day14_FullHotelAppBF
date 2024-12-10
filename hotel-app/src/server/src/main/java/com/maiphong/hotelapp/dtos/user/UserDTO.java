package com.maiphong.hotelapp.dtos.user;

import org.hibernate.validator.constraints.Length;

import com.maiphong.hotelapp.dtos.BaseDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO extends BaseDTO {

    @NotBlank(message = "First Name is required")
    @Length(min = 2, max = 50, message = "First Name must be between 2 and 50 characters")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    @Length(min = 2, max = 50, message = "Last Name must be between 2 and 50 characters")
    private String lastName;

    @NotBlank(message = "Username is required")
    @Length(min = 2, max = 50, message = "Username must be between 2 and 50 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Length(min = 2, max = 50, message = "Email must be between 2 and 50 characters")
    private String email;

    @NotBlank(message = "Phone is required")
    @Length(min = 2, max = 20, message = "Phone must be between 2 and 20 characters")
    private String phoneNumber;

}
