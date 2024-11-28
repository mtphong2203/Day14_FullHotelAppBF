package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.maiphong.hotelapp.dtos.user.UserCreateDTO;
import com.maiphong.hotelapp.dtos.user.UserDTO;
import com.maiphong.hotelapp.dtos.user.UserUpdateDTO;

public interface UserService {
    List<UserDTO> getAll();

    UserDTO getById(UUID id);

    Page<UserDTO> searchByUsername(String username, Pageable pageable);

    boolean create(UserCreateDTO userCreateDTO);

    boolean update(UUID id, UserUpdateDTO userUpdateDTO);

    boolean delete(UUID id);
}
