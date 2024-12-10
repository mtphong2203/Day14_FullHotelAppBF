package com.maiphong.hotelapp.controllers;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maiphong.hotelapp.dtos.user.UserCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.user.UserMasterDTO;
import com.maiphong.hotelapp.mappers.CustomPageResponse;
import com.maiphong.hotelapp.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    private final UserService userService;
    private final PagedResourcesAssembler<UserMasterDTO> pageResource;

    public UserController(UserService userService, PagedResourcesAssembler<UserMasterDTO> pageResource) {
        this.userService = userService;
        this.pageResource = pageResource;
    }

    @GetMapping
    public ResponseEntity<List<UserMasterDTO>> getAll() {
        var userDTOs = userService.getAll();

        if (userDTOs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserMasterDTO> getById(@PathVariable String id) {
        var userDTO = userService.getById(id);

        if (userDTO == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPage(@RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "username") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {

        Pageable pageable = null;

        if (order.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }

        var masterDTOs = userService.searchByPage(keyword, pageable);

        var pageModel = pageResource.toModel(masterDTOs);

        Collection<EntityModel<UserMasterDTO>> data = pageModel.getContent();

        var links = pageModel.getLinks();

        var response = new CustomPageResponse<EntityModel<UserMasterDTO>>(data, pageModel.getMetadata(), links);

        return ResponseEntity.ok(response);

    }

    @GetMapping("/searchByName")
    public ResponseEntity<List<UserMasterDTO>> searchByName(@RequestParam String keyword) {
        var masterDTOs = userService.searchByKeyword(keyword);
        return ResponseEntity.ok(masterDTOs);
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody UserCreateUpdateDTO userDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        var masterDTO = userService.create(userDTO);

        if (masterDTO == null) {
            return ResponseEntity.badRequest().body("Fail to create user");
        }

        return ResponseEntity.status(201).body(masterDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @Valid @RequestBody UserCreateUpdateDTO userDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        var masterDTO = userService.update(id, userDTO);

        if (masterDTO == null) {
            return ResponseEntity.badRequest().body("Fail to update user");
        }

        return ResponseEntity.ok(masterDTO);
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
