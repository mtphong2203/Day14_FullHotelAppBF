package com.maiphong.hotelapp.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedResourcesAssembler;
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

import com.maiphong.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.room.RoomMasterDTO;
import com.maiphong.hotelapp.entities.RoomType;
import com.maiphong.hotelapp.services.RoomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/rooms")
public class RoomController {
    private final RoomService roomService;
    private final PagedResourcesAssembler<RoomMasterDTO> pagedResourcesAssembler;

    public RoomController(RoomService roomService, PagedResourcesAssembler<RoomMasterDTO> pagedResourcesAssembler) {
        this.roomService = roomService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @GetMapping
    public ResponseEntity<List<RoomMasterDTO>> getAll() {
        List<RoomMasterDTO> roomDTOs = roomService.getAll();
        return ResponseEntity.ok(roomDTOs);
    }

    @GetMapping("/searchByType")
    public ResponseEntity<List<RoomMasterDTO>> searchByType(@RequestParam RoomType roomType) {
        if (roomType == null) {
            return ResponseEntity.notFound().build();
        }
        List<RoomMasterDTO> roomDTOs = roomService.searchByType(roomType);

        if (roomDTOs == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(roomDTOs);
    }

    @GetMapping("/searchByNumber")
    public ResponseEntity<List<RoomMasterDTO>> searchByNumber(@RequestParam String number) {
        if (number == null) {
            return ResponseEntity.notFound().build();
        }

        List<RoomMasterDTO> roomDTOs = roomService.searchByNumber(number);

        if (roomDTOs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(roomDTOs);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "number") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {

        Pageable pageable = null;

        if (order.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }

        var masterDTOs = roomService.searchPage(keyword, pageable);

        return ResponseEntity.ok(pagedResourcesAssembler.toModel(masterDTOs));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomMasterDTO> getById(@PathVariable String id) {
        RoomMasterDTO roomDTO = roomService.getById(id);

        if (roomDTO == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(roomDTO);
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody RoomCreateUpdateDTO roomDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        var masterDTO = roomService.create(roomDTO);

        if (masterDTO == null) {
            return ResponseEntity.badRequest().body("Fail to create room");
        }

        return ResponseEntity.status(201).body(masterDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @Valid @RequestBody RoomCreateUpdateDTO roomDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        var masterDTO = roomService.update(id, roomDTO);

        if (masterDTO == null) {
            return ResponseEntity.badRequest().body("Fail to update room");
        }

        return ResponseEntity.ok(masterDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        boolean isDeleted = roomService.delete(id);

        if (!isDeleted) {
            return ResponseEntity.badRequest().body(isDeleted);
        }

        return ResponseEntity.ok(isDeleted);
    }

}
