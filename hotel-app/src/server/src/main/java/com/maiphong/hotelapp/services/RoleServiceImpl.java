package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maiphong.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.role.RoleMasterDTO;
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
    public List<RoleMasterDTO> getAll() {
        List<Role> roles = roleRepository.findAll();

        List<RoleMasterDTO> roleDTOs = roles.stream().map(role -> {
            RoleMasterDTO roleDTO = roleMapper.toMasterDTO(role);

            return roleDTO;
        }).toList();
        return roleDTOs;
    }

    @Override
    public RoleMasterDTO getById(String id) {
        Role role = roleRepository.findById(UUID.fromString(id)).orElse(null);

        if (role == null) {
            throw new ResourceNotFoundException("Role is not found");
        }

        RoleMasterDTO roleDTO = roleMapper.toMasterDTO(role);

        return roleDTO;
    }

    @Override
    public RoleMasterDTO create(RoleCreateUpdateDTO roleDTO) {
        if (roleDTO == null) {
            throw new IllegalArgumentException("Role create is not null");
        }

        var existingRole = roleRepository.findByName(roleDTO.getName());
        if (existingRole != null) {
            throw new IllegalArgumentException("Role number already exists");
        }

        Role role = roleMapper.toEntity(roleDTO);

        role = roleRepository.save(role);

        RoleMasterDTO masterDTO = roleMapper.toMasterDTO(role);

        return masterDTO;
    }

    @Override
    public RoleMasterDTO update(UUID id, RoleCreateUpdateDTO roleDTO) {
        if (roleDTO == null) {
            throw new IllegalArgumentException("Role create is not null");
        }

        Role role = roleRepository.findById(id).orElse(null);

        if (role == null) {
            throw new ResourceNotFoundException("Role is not found");
        }

        roleMapper.toEntity(roleDTO, role);

        role = roleRepository.save(role);

        RoleMasterDTO masterDTO = roleMapper.toMasterDTO(role);

        return masterDTO;
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

    @Override
    public List<RoleMasterDTO> searchByName(String keyword) {
        Specification<Role> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }

            return cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
        };

        List<Role> roles = roleRepository.findAll(spec);

        List<RoleMasterDTO> roleDTOs = roles.stream().map(role -> {
            return roleMapper.toMasterDTO(role);
        }).toList();

        return roleDTOs;
    }

    @Override
    public Page<RoleMasterDTO> searchPage(String keyword, Pageable pageable) {
        Specification<Role> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }

            return cb.like(cb.lower(root.get("name")), "%" + keyword.toLowerCase() + "%");
        };

        Page<Role> roles = roleRepository.findAll(spec, pageable);

        Page<RoleMasterDTO> roleDTOs = roles.map(role -> {
            return roleMapper.toMasterDTO(role);
        });

        return roleDTOs;
    }

}
