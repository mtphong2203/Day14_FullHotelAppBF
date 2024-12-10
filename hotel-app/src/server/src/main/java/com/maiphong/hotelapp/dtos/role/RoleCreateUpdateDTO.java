package com.maiphong.hotelapp.dtos.role;

import org.hibernate.validator.constraints.Length;

import com.maiphong.hotelapp.dtos.MasterCreateUpdateDTO;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleCreateUpdateDTO extends MasterCreateUpdateDTO {
    @NotNull(message = "Name is required")
    private String name;

    @Length(max = 255, message = "Maximum is 255 characters")
    private String description;
}
