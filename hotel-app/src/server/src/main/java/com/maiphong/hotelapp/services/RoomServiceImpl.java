package com.maiphong.hotelapp.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maiphong.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.room.RoomDTO;
import com.maiphong.hotelapp.entities.Room;
import com.maiphong.hotelapp.entities.RoomType;
import com.maiphong.hotelapp.mappers.RoomMapper;
import com.maiphong.hotelapp.repositories.RoomRepository;

@Service
@Transactional
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public RoomServiceImpl(RoomRepository roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    @Override
    public List<RoomDTO> getAll() {
        List<Room> rooms = roomRepository.findAll();

        List<RoomDTO> roomDTOs = rooms.stream().map(room -> {
            RoomDTO roomDTO = roomMapper.toRoomDTO(room);
            return roomDTO;
        }).toList();

        return roomDTOs;
    }

    @Override
    public RoomDTO getById(UUID id) {
        Room room = roomRepository.findById(id).orElse(null);

        if (room == null) {
            throw new IllegalArgumentException("Room is not found");
        }

        RoomDTO roomDTO = roomMapper.toRoomDTO(room);

        return roomDTO;
    }

    @Override
    public boolean create(RoomCreateUpdateDTO roomCreateUpdateDTO) {
        if (roomCreateUpdateDTO == null) {
            throw new IllegalArgumentException("Room create is not null");
        }

        Room room = roomRepository.findByNumber(roomCreateUpdateDTO.getNumber());

        if (room != null) {
            throw new IllegalArgumentException("Room number is already exist!");
        }

        Room newRoom = roomMapper.toRoom(roomCreateUpdateDTO);
        newRoom.setCreatedAt(LocalDateTime.now());

        newRoom = roomRepository.save(newRoom);

        return newRoom != null;

    }

    @Override
    public boolean update(UUID id, RoomCreateUpdateDTO roomCreateUpdateDTO) {
        if (roomCreateUpdateDTO == null) {
            throw new IllegalArgumentException("Room create is not null");
        }

        Room room = roomRepository.findByNumber(roomCreateUpdateDTO.getNumber());

        if (room != null && !room.getId().equals(id)) {
            throw new IllegalArgumentException("Room is not found!");
        }

        roomMapper.toRoom(roomCreateUpdateDTO, room);
        room.setUpdatedAt(LocalDateTime.now());

        room = roomRepository.save(room);

        return room != null;
    }

    @Override
    public boolean delete(UUID id) {
        Room room = roomRepository.findById(id).orElse(null);

        if (room == null) {
            throw new IllegalArgumentException("Room is not found!");
        }

        roomRepository.delete(room);

        return !roomRepository.existsById(id);

    }

    @Override
    public Page<RoomDTO> search(String keyword, Pageable pageable) {
        Specification<Room> spec = (root, query, criteriaBuilder) -> {
            if (keyword == null) {
                return null;
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("number")), "%" + keyword.toLowerCase() + "%");
        };

        Page<Room> rooms = roomRepository.findAll(spec, pageable);

        Page<RoomDTO> roomDTOs = rooms.map(room -> {
            RoomDTO roomDTO = roomMapper.toRoomDTO(room);
            return roomDTO;
        });
        return roomDTOs;
    }

    @Override
    public List<RoomDTO> searchByType(RoomType roomType) {
        Specification<Room> spec = (root, query, criteriaBuilder) -> {
            if (roomType == null) {
                return null;
            }

            return criteriaBuilder.equal(root.get("type"), roomType);
        };

        List<Room> rooms = roomRepository.findAll(spec);

        List<RoomDTO> roomDTOs = rooms.stream().map(room -> {
            RoomDTO roomDTO = roomMapper.toRoomDTO(room);

            return roomDTO;
        }).toList();
        return roomDTOs;
    }

    @Override
    public List<RoomDTO> searchByNumber(String number) {
        Specification<Room> spec = (root, query, cb) -> {
            if (number == null) {
                return null;
            }

            return cb.like(cb.lower(root.get("number")), "%" + number.toLowerCase() + "%");
        };

        List<Room> rooms = roomRepository.findAll(spec);

        List<RoomDTO> roomDTOs = rooms.stream().map(room -> {
            RoomDTO roomDTO = roomMapper.toRoomDTO(room);

            return roomDTO;
        }).toList();

        return roomDTOs;

    }

}
