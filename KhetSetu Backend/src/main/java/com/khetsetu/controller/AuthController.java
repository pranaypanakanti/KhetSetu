package com.khetsetu.controller;

import com.khetsetu.model.dto.request.SendOtpRequestDTO;
import com.khetsetu.model.dto.request.VerifyOtpRequestDTO;
import com.khetsetu.model.dto.response.AuthResponseDTO;
import com.khetsetu.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/send-otp")
    public ResponseEntity<Void> sendOtp(@Valid @RequestBody SendOtpRequestDTO request) {
        authService.sendOtp(request.getMobile());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponseDTO> verifyOtp(@Valid @RequestBody VerifyOtpRequestDTO request,
                                                     HttpServletResponse response) {
        AuthResponseDTO authResponse = authService.verifyOtp(request.getMobile(), request.getOtp(), response);
        HttpStatus status = authResponse.isNewUser() ? HttpStatus.CREATED : HttpStatus.OK;
        return ResponseEntity.status(status).body(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refresh(@CookieValue(name = "refreshToken", required = false) String refreshToken,
                                                   HttpServletResponse response) {
        AuthResponseDTO authResponse = authService.refreshAccessToken(refreshToken, response);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.ok().build();
    }
}