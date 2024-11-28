package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import com.maiphong.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.role.RoleDTO;

public interface RoleService {
    List<RoleDTO> getAll();

    RoleDTO getById(UUID id);

    boolean create(RoleCreateUpdateDTO roleCreateUpdateDTO);

    boolean update(UUID id, RoleCreateUpdateDTO roleCreateUpdateDTO);

    boolean delete(UUID id);
}
