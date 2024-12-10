package com.maiphong.hotelapp.mappers;

import org.mapstruct.*;

import com.maiphong.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.role.RoleDTO;
import com.maiphong.hotelapp.dtos.role.RoleMasterDTO;
import com.maiphong.hotelapp.entities.Role;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoleMapper {

    Role toEntity(RoleCreateUpdateDTO DTO);

    Role toEntity(RoleCreateUpdateDTO DTO, @MappingTarget Role entity);

    RoleDTO toDTO(Role entity);

    RoleMasterDTO toMasterDTO(Role entity);

}
