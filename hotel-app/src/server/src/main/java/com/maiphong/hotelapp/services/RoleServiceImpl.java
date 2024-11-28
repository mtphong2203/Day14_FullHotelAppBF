package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maiphong.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.role.RoleDTO;
import com.maiphong.hotelapp.entities.Role;
import com.maiphong.hotelapp.exceptions.ResourceNotFoundException;
import com.maiphong.hotelapp.mappers.RoleMapper;
import com.maiphong.hotelapp.repositories.RoleRepository;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public RoleServiceImpl(RoleRepository roleRepository, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.roleMapper = roleMapper;
    }

    @Override
    public List<RoleDTO> getAll() {
        List<Role> roles = roleRepository.findAll();

        List<RoleDTO> roleDTOs = roles.stream().map(role -> {
            RoleDTO roleDTO = roleMapper.toRoleDTO(role);

            return roleDTO;
        }).toList();
        return roleDTOs;
    }

    @Override
    public RoleDTO getById(UUID id) {
        Role role = roleRepository.findById(id).orElse(null);

        if (role == null) {
            throw new ResourceNotFoundException("Role is not found");
        }

        RoleDTO roleDTO = roleMapper.toRoleDTO(role);

        return roleDTO;
    }

    @Override
    public boolean create(RoleCreateUpdateDTO roleCreateUpdateDTO) {
        if (roleCreateUpdateDTO == null) {
            throw new IllegalArgumentException("Role create is not null");
        }

        Role role = roleMapper.toRole(roleCreateUpdateDTO);

        role = roleRepository.save(role);

        return role != null;
    }

    @Override
    public boolean update(UUID id, RoleCreateUpdateDTO roleCreateUpdateDTO) {
        if (roleCreateUpdateDTO == null) {
            throw new IllegalArgumentException("Role create is not null");
        }

        Role role = roleRepository.findById(id).orElse(null);

        if (role == null) {
            throw new ResourceNotFoundException("Role is not found");
        }

        roleMapper.toRole(roleCreateUpdateDTO, role);

        role = roleRepository.save(role);

        return role != null;
    }

    @Override
    public boolean delete(UUID id) {
        Role role = roleRepository.findById(id).orElse(null);

        if (role == null) {
            throw new ResourceNotFoundException("Role is not found");
        }

        roleRepository.delete(role);

        return !roleRepository.existsById(id);
    }

}
