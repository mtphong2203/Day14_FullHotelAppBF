package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.maiphong.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.role.RoleMasterDTO;

public interface RoleService {
    List<RoleMasterDTO> getAll();

    List<RoleMasterDTO> searchByName(String keyword);

    Page<RoleMasterDTO> searchPage(String keyword, Pageable pageable);

    RoleMasterDTO getById(String id);

    RoleMasterDTO create(RoleCreateUpdateDTO roleDTO);

    RoleMasterDTO update(UUID id, RoleCreateUpdateDTO roleDTO);

    boolean delete(UUID id);
}
