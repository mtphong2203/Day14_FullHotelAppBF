package com.maiphong.hotelapp.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maiphong.hotelapp.dtos.user.UserCreateDTO;
import com.maiphong.hotelapp.dtos.user.UserDTO;
import com.maiphong.hotelapp.dtos.user.UserUpdateDTO;
import com.maiphong.hotelapp.services.UserService;

@RestController
@RequestMapping("api/manager/user")
public class UserController {

    private final UserService userService;
    private final PagedResourcesAssembler<UserDTO> pageResource;

    public UserController(UserService userService, PagedResourcesAssembler<UserDTO> pageResource) {
        this.userService = userService;
        this.pageResource = pageResource;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAll() {
        var userDTOs = userService.getAll();

        if (userDTOs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable UUID id) {
        var userDTO = userService.getById(id);

        if (userDTO == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(
            @RequestParam(required = false) String username,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {
        if (username == null) {
            getAll();
        }

        Pageable pageable = PageRequest.of(page, size);

        var users = userService.searchByUsername(username, pageable);

        var pageModel = pageResource.toModel(users);

        return ResponseEntity.ok(pageModel);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody UserCreateDTO userCreateDTO) {
        boolean isCreated = userService.create(userCreateDTO);

        if (!isCreated) {
            return ResponseEntity.badRequest().body(isCreated);
        }

        return ResponseEntity.status(201).body(isCreated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody UserUpdateDTO userUpdateDTO) {
        boolean isUpdated = userService.update(id, userUpdateDTO);

        if (!isUpdated) {
            return ResponseEntity.badRequest().body(isUpdated);
        }

        return ResponseEntity.ok(isUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        boolean isDeleted = userService.delete(id);

        if (!isDeleted) {
            return ResponseEntity.badRequest().body(isDeleted);
        }

        return ResponseEntity.ok(isDeleted);
    }

}
