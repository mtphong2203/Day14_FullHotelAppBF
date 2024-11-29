package com.maiphong.hotelapp.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maiphong.hotelapp.dtos.user.UserCreateUpdateDTO;
import com.maiphong.hotelapp.dtos.user.UserMasterDTO;
import com.maiphong.hotelapp.entities.User;
import com.maiphong.hotelapp.exceptions.ResourceNotFoundException;
import com.maiphong.hotelapp.mappers.UserMapper;
import com.maiphong.hotelapp.repositories.UserRepository;

import jakarta.persistence.criteria.Predicate;

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
    public List<UserMasterDTO> getAll() {
        List<User> users = userRepository.findAll();

        List<UserMasterDTO> userDTOs = users.stream().map(user -> {
            UserMasterDTO userDTO = userMapper.toMasterDTO(user);
            return userDTO;
        }).toList();

        return userDTOs;
    }

    @Override
    public UserMasterDTO getById(String id) {
        User user = userRepository.findById(UUID.fromString(id)).orElse(null);

        if (user == null) {
            throw new ResourceNotFoundException("User is not found");
        }

        UserMasterDTO userDTO = userMapper.toMasterDTO(user);

        return userDTO;
    }

    @Override
    public UserMasterDTO create(UserCreateUpdateDTO userDTO) {
        if (userDTO == null) {
            throw new IllegalArgumentException("User create can not null");
        }

        User user = userRepository.findByUsername(userDTO.getUsername());

        if (user != null) {
            throw new IllegalArgumentException("User name is already exist!");
        }

        User newUser = userMapper.toEntity(userDTO);
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        newUser = userRepository.save(newUser);

        UserMasterDTO masterDTO = userMapper.toMasterDTO(newUser);

        return masterDTO;
    }

    @Override
    public UserMasterDTO update(UUID id, UserCreateUpdateDTO userDTO) {
        if (userDTO == null) {
            throw new IllegalArgumentException("User create can not null");
        }

        User existUser = userRepository.findByUsername(userDTO.getUsername());

        if (existUser != null && existUser.getId().equals(id)) {
            throw new ResourceNotFoundException("User name is already exist!");
        }

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            throw new ResourceNotFoundException("User is not found");
        }

        userMapper.toEntity(userDTO, user);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        user = userRepository.save(user);

        UserMasterDTO masterDTO = userMapper.toMasterDTO(user);

        return masterDTO;
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
    public Page<UserMasterDTO> searchByPage(String keyword, Pageable pageable) {
        Specification<User> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }

            return cb.like(cb.lower(root.get("username")), "%" + keyword.toLowerCase() + "%");
        };

        Page<User> users = userRepository.findAll(spec, pageable);

        Page<UserMasterDTO> userDTOs = users.map(user -> {
            UserMasterDTO userDTO = userMapper.toMasterDTO(user);
            return userDTO;
        });

        return userDTOs;
    }

    @Override
    public List<UserMasterDTO> searchByKeyword(String keyword) {
        Specification<User> spec = (root, _, cb) -> {
            if (keyword == null) {
                return null;
            }

            Predicate predicate = cb.like(cb.lower(root.get("username")), "%" + keyword.toLowerCase() + "%");

            predicate = cb.or(predicate, cb.like(cb.lower(root.get("email")), "%" + keyword.toLowerCase() + "%"));

            predicate = cb.or(predicate, cb.like(cb.lower(root.get("phoneNumber")), "%" + keyword.toLowerCase() + "%"));

            return predicate;
        };

        List<User> users = userRepository.findAll(spec);

        List<UserMasterDTO> userDTOs = users.stream().map(user -> {
            UserMasterDTO userDTO = userMapper.toMasterDTO(user);
            return userDTO;
        }).toList();

        return userDTOs;
    }
}
