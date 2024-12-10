package com.maiphong.hotelapp.mappers;

import org.mapstruct.*;

import com.maiphong.hotelapp.dtos.auth.RegisterRequestDTO;
import com.maiphong.hotelapp.dtos.user.UserCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.user.UserDTO;
import com.maiphong.hotelapp.dtos.user.UserMasterDTO;
import com.maiphong.hotelapp.entities.User;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    User toEntity(UserCreateUpdateDTO DTO);

    User toEntity(RegisterRequestDTO DTO);

    User toEntity(UserCreateUpdateDTO DTO, @MappingTarget User entity);

    UserDTO toDTO(User entity);

    UserMasterDTO toMasterDTO(User entity);

}
