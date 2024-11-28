package com.maiphong.hotelapp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.maiphong.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.role.RoleDTO;
import com.maiphong.hotelapp.entities.Role;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleCreateUpdateDTO roleCreateUpdateDTO);

    Role toRole(RoleCreateUpdateDTO roleCreateUpdateDTO, @MappingTarget Role role);

    RoleDTO toRoleDTO(Role role);

}
