package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maiphong.hotelapp.dtos.room.RoomCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.room.RoomMasterDTO;
import com.maiphong.hotelapp.entities.Room;
import com.maiphong.hotelapp.entities.RoomType;
import com.maiphong.hotelapp.exceptions.ResourceNotFoundException;
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
    public List<RoomMasterDTO> getAll() {
        List<Room> rooms = roomRepository.findAll();

        List<RoomMasterDTO> roomDTOs = rooms.stream().map(room -> {
            RoomMasterDTO roomDTO = roomMapper.toMasterDTO(room);
            return roomDTO;
        }).toList();

        return roomDTOs;
    }

    @Override
    public RoomMasterDTO getById(String id) {
        Room room = roomRepository.findById(UUID.fromString(id)).orElse(null);

        if (room == null) {
            throw new IllegalArgumentException("Room is not found");
        }

        RoomMasterDTO roomDTO = roomMapper.toMasterDTO(room);

        return roomDTO;
    }

    @Override
    public RoomMasterDTO create(RoomCreateUpdateDTO roomDTO) {
        if (roomDTO == null) {
            throw new IllegalArgumentException("Room create is not null");
        }

        Room room = roomRepository.findByNumber(roomDTO.getNumber());

        if (room != null) {
            throw new IllegalArgumentException("Room number is already exist!");
        }

        Room newRoom = roomMapper.toEntity(roomDTO);

        newRoom = roomRepository.save(newRoom);

        RoomMasterDTO masterDTO = roomMapper.toMasterDTO(newRoom);

        return masterDTO;

    }

    @Override
    public RoomMasterDTO update(UUID id, RoomCreateUpdateDTO roomDTO) {
        if (roomDTO == null) {
            throw new IllegalArgumentException("Room create is not null");
        }

        Room room = roomRepository.findById(id).orElse(null);

        if (room == null) {
            throw new ResourceNotFoundException("Room is not found");
        }

        roomMapper.toEntity(roomDTO, room);

        room = roomRepository.save(room);

        RoomMasterDTO masterDTO = roomMapper.toMasterDTO(room);

        return masterDTO;
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
    public Page<RoomMasterDTO> searchPage(String keyword, Pageable pageable) {
        Specification<Room> spec = (root, _, criteriaBuilder) -> {
            if (keyword == null) {
                return null;
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("number")), "%" + keyword.toLowerCase() + "%");
        };

        Page<Room> rooms = roomRepository.findAll(spec, pageable);

        Page<RoomMasterDTO> roomDTOs = rooms.map(room -> {
            RoomMasterDTO roomDTO = roomMapper.toMasterDTO(room);
            return roomDTO;
        });
        return roomDTOs;
    }

    @Override
    public List<RoomMasterDTO> searchByType(RoomType roomType) {
        Specification<Room> spec = (root, _, criteriaBuilder) -> {
            if (roomType == null) {
                return null;
            }

            return criteriaBuilder.equal(root.get("type"), roomType);
        };

        List<Room> rooms = roomRepository.findAll(spec);

        List<RoomMasterDTO> roomDTOs = rooms.stream().map(room -> {
            RoomMasterDTO roomDTO = roomMapper.toMasterDTO(room);

            return roomDTO;
        }).toList();
        return roomDTOs;
    }

    @Override
    public List<RoomMasterDTO> searchByNumber(String number) {
        Specification<Room> spec = (root, _, cb) -> {
            if (number == null) {
                return null;
            }

            return cb.like(cb.lower(root.get("number")), "%" + number.toLowerCase() + "%");
        };

        List<Room> rooms = roomRepository.findAll(spec);

        List<RoomMasterDTO> roomDTOs = rooms.stream().map(room -> {
            RoomMasterDTO roomDTO = roomMapper.toMasterDTO(room);

            return roomDTO;
        }).toList();

        return roomDTOs;

    }

}
