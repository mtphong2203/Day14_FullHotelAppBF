package com.maiphong.hotelapp.entities;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends MasterEntityBase {

    @Column(nullable = false, columnDefinition = "NVARCHAR(20)")
    private String firstName;

    @Column(columnDefinition = "NVARCHAR(20)")
    private String lastName;

    @Column(columnDefinition = "NVARCHAR(30)", unique = true, nullable = false)
    private String username;

    @Column(columnDefinition = "NVARCHAR(30)", unique = true, nullable = false)
    private String phoneNumber;

    @Column(columnDefinition = "NVARCHAR(30)", unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToMany()
    @JoinTable(name = "UserRoles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

}
