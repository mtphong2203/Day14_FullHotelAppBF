package com.maiphong.hotelapp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.maiphong.hotelapp.dtos.user.UserCreateDTO;
import com.maiphong.hotelapp.dtos.user.UserDTO;
import com.maiphong.hotelapp.dtos.user.UserUpdateDTO;
import com.maiphong.hotelapp.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserCreateDTO userCreateUpdateDTO);

    User toUser(UserUpdateDTO userCreateUpdateDTO, @MappingTarget User user);

    UserDTO toUserDTO(User user);

}
