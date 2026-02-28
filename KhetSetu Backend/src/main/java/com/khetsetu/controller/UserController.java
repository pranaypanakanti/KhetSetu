package com.khetsetu.controller;

import com.khetsetu.model.dto.request.UserUpdateRequestDTO;
import com.khetsetu.model.dto.response.UserResponseDTO;
import com.khetsetu.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUserProfile());
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponseDTO> updateCurrentUser(@Valid @RequestBody UserUpdateRequestDTO request) {
        return ResponseEntity.ok(userService.updateCurrentUserProfile(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserPublicInfo(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.getUserPublicInfo(id));
    }
}