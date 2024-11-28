package com.maiphong.hotelapp.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maiphong.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.role.RoleDTO;
import com.maiphong.hotelapp.services.RoleService;

@RestController
@RequestMapping("api/manager/role")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<RoleDTO>> getAll() {
        var roleDTOs = roleService.getAll();

        if (roleDTOs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(roleDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDTO> getById(@PathVariable UUID id) {
        var roleDTO = roleService.getById(id);
        if (roleDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(roleDTO);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody RoleCreateUpdateDTO roleCreateUpdateDTO) {
        boolean isCreated = roleService.create(roleCreateUpdateDTO);

        if (!isCreated) {
            return ResponseEntity.badRequest().body(isCreated);
        }

        return ResponseEntity.status(201).body(isCreated);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody RoleCreateUpdateDTO roleCreateUpdateDTO) {
        boolean isUpdated = roleService.update(id, roleCreateUpdateDTO);

        if (!isUpdated) {
            return ResponseEntity.badRequest().body(isUpdated);
        }

        return ResponseEntity.status(201).body(isUpdated);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        boolean isDeleted = roleService.delete(id);

        if (!isDeleted) {
            return ResponseEntity.badRequest().body(isDeleted);
        }

        return ResponseEntity.status(201).body(isDeleted);
    }

}
