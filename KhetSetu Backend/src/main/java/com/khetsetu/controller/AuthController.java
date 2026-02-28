package com.khetsetu.controller;

import com.khetsetu.model.dto.request.SendOtpRequest;
import com.khetsetu.model.dto.request.VerifyOtpRequest;
import com.khetsetu.model.dto.response.AuthResponse;
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
    public ResponseEntity<Void> sendOtp(@Valid @RequestBody SendOtpRequest request) {
        authService.sendOtp(request.getMobile());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(@Valid @RequestBody VerifyOtpRequest request,
                                                  HttpServletResponse response) {
        AuthResponse authResponse = authService.verifyOtp(request.getMobile(), request.getOtp(), response);
        return ResponseEntity.status(authResponse.getMessage().contains("created") ? HttpStatus.CREATED : HttpStatus.OK)
                .body(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@CookieValue(name = "refreshToken", required = false) String refreshToken,
                                                HttpServletResponse response) {
        AuthResponse authResponse = authService.refreshAccessToken(refreshToken, response);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.ok().build();
    }
}