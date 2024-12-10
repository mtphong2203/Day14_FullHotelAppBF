package com.maiphong.hotelapp.services;

import java.util.UUID;

import com.maiphong.hotelapp.dtos.auth.RegisterRequestDTO;

public interface AuthService {
    boolean existsByUsername(String username);

    UUID register(RegisterRequestDTO registerRequestDTO);
}
