package com.maiphong.hotelapp.mappers;

import org.mapstruct.*;

import com.maiphong.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.room.RoomDTO;
import com.maiphong.hotelapp.dtos.room.RoomMasterDTO;
import com.maiphong.hotelapp.entities.Room;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface RoomMapper {

    Room toEntity(RoomCreateUpdateDTO DTO);

    Room toEntity(RoomCreateUpdateDTO DTO, @MappingTarget Room entity);

    RoomDTO toDTO(Room entity);

    RoomMasterDTO toMasterDTO(Room entity);

}
