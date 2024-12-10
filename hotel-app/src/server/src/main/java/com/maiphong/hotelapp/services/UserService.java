package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.maiphong.hotelapp.dtos.user.UserCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.user.UserMasterDTO;

public interface UserService {
    List<UserMasterDTO> getAll();

    List<UserMasterDTO> searchByKeyword(String keyword);

    Page<UserMasterDTO> searchByPage(String keyword, Pageable pageable);

    UserMasterDTO getById(String id);

    UserMasterDTO create(UserCreateUpdateDTO userDTO);

    UserMasterDTO update(UUID id, UserCreateUpdateDTO userDTO);

    boolean delete(UUID id);
}
