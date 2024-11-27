package com.maiphong.hotelapp.services;

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
import com.maiphong.hotelapp.repositories.RoomRepository;

@Service
@Transactional
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public List<RoomDTO> getAll() {
        List<Room> rooms = roomRepository.findAll();

        List<RoomDTO> roomDTOs = rooms.stream().map(room -> {
            RoomDTO roomDTO = new RoomDTO();
            roomDTO.setId(room.getId());
            roomDTO.setNumber(room.getNumber());
            roomDTO.setCapacity(room.getCapacity());
            roomDTO.setType(room.getType());
            roomDTO.setPrice(room.getPrice());
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

        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(room.getId());
        roomDTO.setNumber(room.getNumber());
        roomDTO.setCapacity(room.getCapacity());
        roomDTO.setType(room.getType());
        roomDTO.setPrice(room.getPrice());

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

        Room newRoom = new Room();
        newRoom.setNumber(roomCreateUpdateDTO.getNumber());
        newRoom.setCapacity(roomCreateUpdateDTO.getCapacity());
        newRoom.setType(roomCreateUpdateDTO.getType());
        newRoom.setPrice(roomCreateUpdateDTO.getPrice());

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

        room.setNumber(roomCreateUpdateDTO.getNumber());
        room.setCapacity(roomCreateUpdateDTO.getCapacity());
        room.setType(roomCreateUpdateDTO.getType());
        room.setPrice(roomCreateUpdateDTO.getPrice());

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

    // @Override
    // public Page<RoomDTO> searchByNumber(String number, Pageable pageable) {
    // Specification<Room> spec = (root, query, criteriaBuilder) -> {
    // return criteriaBuilder.equal(root.get("number"), number);
    // };

    // var rooms = roomRepository.findAll(spec, pageable);

    // var roomDTOs = rooms.map(room -> {
    // RoomDTO roomDTO = new RoomDTO();
    // roomDTO.setId(room.getId());
    // roomDTO.setNumber(room.getNumber());
    // roomDTO.setCapacity(room.getCapacity());
    // roomDTO.setType(room.getType());
    // roomDTO.setPrice(room.getPrice());

    // return roomDTO;
    // });

    // return roomDTOs;
    // }

    // @Override
    // public List<RoomDTO> searchByType(RoomType roomType, Pageable pageable) {
    // Specification<Room> spec = (root, query, criteriaBuilder) -> {
    // return criteriaBuilder.equal(root.get("type"), roomType);
    // };

    // var rooms = roomRepository.findAll(spec);

    // // var roomDTOs = rooms.map(room -> {
    // // RoomDTO roomDTO = new RoomDTO();
    // // roomDTO.setId(room.getId());
    // // roomDTO.setNumber(room.getNumber());
    // // roomDTO.setCapacity(room.getCapacity());
    // // roomDTO.setType(room.getType());
    // // roomDTO.setPrice(room.getPrice());
    // // return roomDTO;
    // // });
    // return null;

    // }

    // @Override
    // public List<RoomDTO> search(String keyword) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method 'search'");
    // }

}
