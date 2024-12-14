package com.maiphong.hotelapp.services;

import java.util.UUID;

import com.maiphong.hotelapp.dtos.auth.RegisterRequestDTO;
import com.maiphong.hotelapp.dtos.user.UserInformationDTO;

public interface AuthService {
    boolean existsByUsername(String username);

    UUID register(RegisterRequestDTO registerRequestDTO);

    UserInformationDTO getUserInformation(String username);

}
