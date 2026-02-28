package com.khetsetu.service;

import com.khetsetu.model.User;
import com.khetsetu.model.dto.response.AuthResponseDTO;
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

    public AuthResponseDTO verifyOtp(String mobile, String otp, HttpServletResponse response) {
        boolean valid = otpService.validateOtp(mobile, otp);
        if (!valid) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired OTP");
        }

        boolean[] isNewUser = {false};

        User user = userRepository.findByMobile(mobile).orElseGet(() -> {
            isNewUser[0] = true;
            User newUser = new User();
            newUser.setMobile(mobile);
            newUser.setName("");
            return userRepository.save(newUser);
        });

        String accessToken = jwtUtil.generateAccessToken(user.getMobile());
        String refreshToken = jwtUtil.generateRefreshToken(user.getMobile());

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofDays(30))
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());

        String message = isNewUser[0] ? "User created" : "Login successful";
        return new AuthResponseDTO(accessToken, message, isNewUser[0]);
    }

    public AuthResponseDTO refreshAccessToken(String refreshToken, HttpServletResponse response) {
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

        return new AuthResponseDTO(newAccessToken, "Token refreshed", false);
    }

    public void logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }
}