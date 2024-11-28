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

import com.maiphong.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.room.RoomDTO;
import com.maiphong.hotelapp.entities.RoomType;
import com.maiphong.hotelapp.services.RoomService;

@RestController
@RequestMapping("api/manager/room")
public class RoomController {
    private final RoomService roomService;
    private final PagedResourcesAssembler<RoomDTO> pagedResourcesAssembler;

    public RoomController(RoomService roomService, PagedResourcesAssembler<RoomDTO> pagedResourcesAssembler) {
        this.roomService = roomService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @GetMapping
    public ResponseEntity<List<RoomDTO>> getAll() {
        List<RoomDTO> roomDTOs = roomService.getAll();

        if (roomDTOs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(roomDTOs);
    }

    @GetMapping("/type")
    public ResponseEntity<List<RoomDTO>> searchByType(@RequestParam RoomType roomType) {
        if (roomType == null) {
            return ResponseEntity.notFound().build();
        }

        List<RoomDTO> roomDTOs = roomService.searchByType(roomType);

        if (roomDTOs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(roomDTOs);
    }

    @GetMapping("/number")
    public ResponseEntity<List<RoomDTO>> searchByNumber(@RequestParam String number) {
        if (number == null) {
            return ResponseEntity.notFound().build();
        }

        List<RoomDTO> roomDTOs = roomService.searchByNumber(number);

        if (roomDTOs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(roomDTOs);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {

        if (keyword == null) {
            return getAll();
        }

        Pageable pageable = PageRequest.of(page, size);

        Page<RoomDTO> rooms = roomService.search(keyword, pageable);

        var roomPages = pagedResourcesAssembler.toModel(rooms);

        return ResponseEntity.ok(roomPages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDTO> getById(@PathVariable UUID id) {
        RoomDTO roomDTO = roomService.getById(id);

        if (roomDTO == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(roomDTO);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody RoomCreateUpdateDTO roomCreateUpdateDTO) {
        boolean isCreated = roomService.create(roomCreateUpdateDTO);

        if (!isCreated) {
            return ResponseEntity.badRequest().body(isCreated);
        }

        return ResponseEntity.status(201).body(isCreated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody RoomCreateUpdateDTO roomCreateUpdateDTO) {
        boolean isUpdated = roomService.update(id, roomCreateUpdateDTO);

        if (!isUpdated) {
            return ResponseEntity.badRequest().body(isUpdated);
        }

        return ResponseEntity.status(201).body(isUpdated);
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
