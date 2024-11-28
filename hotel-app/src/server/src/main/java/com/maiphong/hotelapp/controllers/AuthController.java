package com.maiphong.hotelapp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maiphong.hotelapp.dtos.auth.LoginRequestDTO;
import com.maiphong.hotelapp.dtos.auth.LoginResponseDTO;
import com.maiphong.hotelapp.dtos.user.UserCreateDTO;
import com.maiphong.hotelapp.services.AuthService;
import com.maiphong.hotelapp.services.TokenService;
import com.maiphong.hotelapp.services.UserService;

@RestController
@RequestMapping("api/manager/auth")
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManagerBuilder authManager;
    private final UserService userService;
    private final TokenService tokenService;

    public AuthController(UserService userService, TokenService tokenService, AuthService authService,
            AuthenticationManagerBuilder authManager) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.authService = authService;
        this.authManager = authManager;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginRequestDTO.getUsername(), loginRequestDTO.getPassword());

        Authentication authentication = authManager.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = tokenService.generateAccessToken(authentication);

        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setAccessToken(accessToken);

        return ResponseEntity.ok(loginResponseDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody UserCreateDTO userCreateDTO) {
        if (authService.existsByUsername(userCreateDTO.getUsername())) {
            return ResponseEntity.badRequest().body(false);
        }

        boolean result = userService.create(userCreateDTO);

        return ResponseEntity.ok(result);
    }

}
