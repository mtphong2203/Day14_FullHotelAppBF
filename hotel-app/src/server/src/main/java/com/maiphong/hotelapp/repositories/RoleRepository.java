package com.maiphong.hotelapp.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maiphong.hotelapp.entities.Role;

public interface RoleRepository extends JpaRepository<Role, UUID> {

}
