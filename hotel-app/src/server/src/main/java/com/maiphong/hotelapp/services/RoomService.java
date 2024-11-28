package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;

import com.maiphong.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.room.RoomDTO;
// import com.maiphong.hotelapp.entities.RoomType;
import com.maiphong.hotelapp.entities.RoomType;

public interface RoomService {
    List<RoomDTO> getAll();

    Page<RoomDTO> search(String keyword, Pageable pageable);

    List<RoomDTO> searchByType(RoomType roomType);

    List<RoomDTO> searchByNumber(String number);

    RoomDTO getById(UUID id);

    boolean create(RoomCreateUpdateDTO roomCreateUpdateDTO);

    boolean update(UUID id, RoomCreateUpdateDTO roomCreateUpdateDTO);

    boolean delete(UUID id);

}
