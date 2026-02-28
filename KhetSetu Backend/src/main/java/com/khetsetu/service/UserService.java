package com.khetsetu.service;

import com.khetsetu.model.User;
import com.khetsetu.model.Village;
import com.khetsetu.model.dto.request.UserUpdateRequestDTO;
import com.khetsetu.model.dto.response.UserResponseDTO;
import com.khetsetu.repository.UserRepository;
import com.khetsetu.repository.VillageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VillageRepository villageRepository;

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails userDetails) {
            String mobile = userDetails.getUsername(); // username is mobile
            return userRepository.findByMobile(mobile)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No authenticated user");
        }
    }

    public UserResponseDTO getCurrentUserProfile() {
        User user = getCurrentUser();
        return mapToUserResponse(user);
    }

    public UserResponseDTO updateCurrentUserProfile(UserUpdateRequestDTO request) {
        User user = getCurrentUser();

        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getVillageId() != null) {
            Village village = villageRepository.findById(request.getVillageId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Village not found"));
            user.setVillage(village);
        }

        User saved = userRepository.save(user);
        return mapToUserResponse(saved);
    }

    public UserResponseDTO getUserPublicInfo(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                null,
                null, // email hidden
                user.getVillage() != null ? user.getVillage().getAddress() : null,
                user.getVillage() != null ? user.getVillage().getLatitude() : null,
                user.getVillage() != null ? user.getVillage().getLongitude() : null,
                user.getTrustScore(),
                user.getCreatedAt()
        );
    }

    private UserResponseDTO mapToUserResponse(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getMobile(),
                user.getEmail(),
                user.getVillage() != null ? user.getVillage().getAddress() : null,
                user.getVillage() != null ? user.getVillage().getLatitude() : null,
                user.getVillage() != null ? user.getVillage().getLongitude() : null,
                user.getTrustScore(),
                user.getCreatedAt()
        );
    }
}