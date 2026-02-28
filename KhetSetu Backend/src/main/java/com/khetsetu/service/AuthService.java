package com.khetsetu.service;

import com.khetsetu.model.User;
import com.khetsetu.model.dto.response.AuthResponse;
import com.khetsetu.repository.UserRepository;
import com.khetsetu.utilis.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final OtpService otpService;
    private final JwtUtil jwtUtil;

    public void sendOtp(String mobile) {
        otpService.generateOtp(mobile);
        // In real app, trigger SMS here
    }

    public AuthResponse verifyOtp(String mobile, String otp, HttpServletResponse response) {
        boolean valid = otpService.validateOtp(mobile, otp);
        if (!valid) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired OTP");
        }

        User user = userRepository.findByMobile(mobile).orElseGet(() -> {
            User newUser = new User();
            newUser.setMobile(mobile);
            newUser.setName(""); // placeholder, user can update later
            return userRepository.save(newUser);
        });

        String accessToken = jwtUtil.generateAccessToken(user.getMobile());
        String refreshToken = jwtUtil.generateRefreshToken(user.getMobile());

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false) // set true in production with HTTPS
                .path("/")
                .maxAge(Duration.ofDays(30)) // match refresh token expiry
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());

        String message = user.getCreatedAt().equals(user.getUpdatedAt()) ? "User created" : "Login successful";
        return new AuthResponse(accessToken, message);
    }

    public AuthResponse refreshAccessToken(String refreshToken, HttpServletResponse response) {
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token missing");
        }

        String mobile = jwtUtil.extractUsername(refreshToken);
        if (mobile == null || !jwtUtil.validateToken(refreshToken) || !jwtUtil.isRefreshToken(refreshToken)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid refresh token");
        }

        User user = userRepository.findByMobile(mobile)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        String newAccessToken = jwtUtil.generateAccessToken(mobile);

        String newRefreshToken = jwtUtil.generateRefreshToken(mobile);
        ResponseCookie cookie = ResponseCookie.from("refreshToken", newRefreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofDays(30))
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());

        return new AuthResponse(newAccessToken, "Token refreshed");
    }

    public void logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0) // immediately expire
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }
}