package com.maiphong.hotelapp.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maiphong.hotelapp.dtos.user.UserCreateDTO;
import com.maiphong.hotelapp.dtos.user.UserDTO;
import com.maiphong.hotelapp.dtos.user.UserUpdateDTO;
import com.maiphong.hotelapp.entities.User;
import com.maiphong.hotelapp.exceptions.ResourceNotFoundException;
import com.maiphong.hotelapp.mappers.UserMapper;
import com.maiphong.hotelapp.repositories.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder pagPasswordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = pagPasswordEncoder;
    }

    @Override
    public List<UserDTO> getAll() {
        List<User> users = userRepository.findAll();

        List<UserDTO> userDTOs = users.stream().map(user -> {
            UserDTO userDTO = userMapper.toUserDTO(user);
            return userDTO;
        }).toList();

        return userDTOs;
    }

    @Override
    public UserDTO getById(UUID id) {
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new ResourceNotFoundException("User is not found");
        }

        UserDTO userDTO = userMapper.toUserDTO(user);
        return userDTO;
    }

    @Override
    public boolean create(UserCreateDTO userCreateDTO) {
        if (userCreateDTO == null) {
            throw new IllegalArgumentException("User create can not null");
        }

        User user = userRepository.findByUsername(userCreateDTO.getUsername());

        if (user != null) {
            throw new IllegalArgumentException("User name is already exist!");
        }

        User newUser = userMapper.toUser(userCreateDTO);
        newUser.setPassword(passwordEncoder.encode(userCreateDTO.getPassword()));
        newUser.setCreatedAt(LocalDateTime.now());

        newUser = userRepository.save(newUser);

        return newUser != null;
    }

    @Override
    public boolean update(UUID id, UserUpdateDTO userUpdateDTO) {
        if (userUpdateDTO == null) {
            throw new IllegalArgumentException("User create can not null");
        }

        User user = userRepository.findByUsername(userUpdateDTO.getUsername());

        if (user == null || !user.getId().equals(id)) {
            throw new ResourceNotFoundException("User name is not exist!");
        }

        userMapper.toUser(userUpdateDTO, user);
        user.setPassword(passwordEncoder.encode(userUpdateDTO.getPassword()));
        user.setUpdatedAt(LocalDateTime.now());

        user = userRepository.save(user);

        return user != null;
    }

    @Override
    public boolean delete(UUID id) {
        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new ResourceNotFoundException("User is not exist!");
        }

        userRepository.delete(user);

        return !userRepository.existsById(id);
    }

    @Override
    public Page<UserDTO> searchByUsername(String username, Pageable pageable) {
        Specification<User> spec = (root, query, cb) -> {
            if (username == null) {
                return null;
            }

            return cb.like(cb.lower(root.get("username")), "%" + username.toLowerCase() + "%");
        };

        Page<User> users = userRepository.findAll(spec, pageable);

        Page<UserDTO> userDTOs = users.map(user -> {
            UserDTO userDTO = userMapper.toUserDTO(user);
            return userDTO;
        });

        return userDTOs;
    }
}
