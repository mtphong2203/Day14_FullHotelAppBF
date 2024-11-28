package com.maiphong.hotelapp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.maiphong.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.room.RoomDTO;
import com.maiphong.hotelapp.entities.Room;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    Room toRoom(RoomCreateUpdateDTO roomCreateUpdateDTO);

    RoomDTO toRoomDTO(Room room);

    Room toRoom(RoomCreateUpdateDTO roomCreateUpdateDTO, @MappingTarget Room room);

}
