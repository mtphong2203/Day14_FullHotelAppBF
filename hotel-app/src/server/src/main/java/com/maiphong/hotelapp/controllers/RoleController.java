package com.maiphong.hotelapp.controllers;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Links;
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

import com.maiphong.hotelapp.dtos.role.RoleCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.role.RoleMasterDTO;
import com.maiphong.hotelapp.mappers.CustomPageResponse;
import com.maiphong.hotelapp.services.RoleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/roles")
public class RoleController {

    private final RoleService roleService;
    private final PagedResourcesAssembler<RoleMasterDTO> pageResource;

    public RoleController(RoleService roleService, PagedResourcesAssembler<RoleMasterDTO> pageResource) {
        this.roleService = roleService;
        this.pageResource = pageResource;
    }

    @GetMapping
    public ResponseEntity<List<RoleMasterDTO>> getAll() {
        var roleDTOs = roleService.getAll();
        return ResponseEntity.ok(roleDTOs);
    }

    @GetMapping("/searchByName")
    public ResponseEntity<List<RoleMasterDTO>> searchByName(@RequestParam String keyword) {
        var masterDTOs = roleService.searchByName(keyword);
        return ResponseEntity.ok(masterDTOs);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPage(@RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "name") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {

        Pageable pageable = null;

        if (order.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }

        Page<RoleMasterDTO> roles = roleService.searchPage(keyword, pageable);

        var pageModel = pageResource.toModel(roles);

        Collection<EntityModel<RoleMasterDTO>> data = pageModel.getContent();

        Links links = pageModel.getLinks();

        var response = new CustomPageResponse<EntityModel<RoleMasterDTO>>(data, pageModel.getMetadata(), links);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleMasterDTO> getById(@PathVariable String id) {
        var roleDTO = roleService.getById(id);
        return ResponseEntity.ok(roleDTO);
    }

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody RoleCreateUpdateDTO roleDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        var masterDTO = roleService.create(roleDTO);

        if (masterDTO == null) {
            return ResponseEntity.badRequest().body("Fail to create role");
        }

        return ResponseEntity.ok(masterDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @PathVariable UUID id, @RequestBody RoleCreateUpdateDTO roleDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        var masterDTO = roleService.update(id, roleDTO);

        if (masterDTO == null) {
            return ResponseEntity.badRequest().body("Fail to update order");
        }

        return ResponseEntity.ok(masterDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        boolean isDeleted = roleService.delete(id);

        if (!isDeleted) {
            return ResponseEntity.badRequest().body("Fail to delete role");
        }

        return ResponseEntity.status(201).body(isDeleted);
    }

}
