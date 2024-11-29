package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.maiphong.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.room.RoomMasterDTO;
import com.maiphong.hotelapp.entities.RoomType;

public interface RoomService {
    List<RoomMasterDTO> getAll();

    Page<RoomMasterDTO> searchPage(String keyword, Pageable pageable);

    List<RoomMasterDTO> searchByType(RoomType roomType);

    List<RoomMasterDTO> searchByNumber(String number);

    RoomMasterDTO getById(String id);

    RoomMasterDTO create(RoomCreateUpdateDTO roomDTO);

    RoomMasterDTO update(UUID id, RoomCreateUpdateDTO roomDTO);

    boolean delete(UUID id);

}
