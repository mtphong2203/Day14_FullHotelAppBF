package com.maiphong.hotelapp.dtos.role;

import com.maiphong.hotelapp.dtos.BaseDTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDTO extends BaseDTO {

    private String name;

    private String description;
}
