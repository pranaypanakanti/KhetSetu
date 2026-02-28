package com.khetsetu.service;

import com.khetsetu.model.User;
import com.khetsetu.model.dto.request.UserSighInDTO;
import com.khetsetu.model.dto.response.AuthResponseDTO;
import com.khetsetu.repository.UserRepo;
import com.khetsetu.utilis.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthService {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private PasswordEncoder encoder;


    public void changePassword(UserSighInDTO user){
        User oldUser = userService.getUserByEmail(user.getEmail());
        oldUser.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(oldUser);
    }

    public AuthResponseDTO signUpWithOtp(UserSighInDTO signUpRequest) {

        if (userRepo.findByEmail(signUpRequest.getEmail()).orElse(null) != null) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        User newUser = createBasicUser(signUpRequest);
        User savedUser = userRepo.save(newUser);

        String accessToken = jwtUtil.generateAccessToken(savedUser.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(savedUser.getEmail());

        return buildAuthResponse(savedUser, accessToken, refreshToken);
    }

    public void resetPasswordWithOtp(UserSighInDTO request) {

        User user = userService.getUserByEmail(request.getEmail());

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userService.saveUser(user);
    }

    public ResponseCookie createRefreshTokenCookie(String refreshToken) {
        return ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false) // Set true in production with HTTPS
                .path("/api/auth/refresh")
                .maxAge(Duration.ofDays(30).getSeconds())
                .sameSite("Strict")
                .build();
    }

    public ResponseCookie createLogoutCookie() {
        return ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/api/auth/refresh")
                .maxAge(0) // Delete cookie
                .sameSite("Strict")
                .build();
    }

    private User createBasicUser(UserSighInDTO signUpRequest) {
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        return user;
    }

    private AuthResponseDTO buildAuthResponse(User user, String accessToken, String refreshToken) {
        return AuthResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .email(user.getEmail())
                .name(user.getName())
                .build();
    }
}