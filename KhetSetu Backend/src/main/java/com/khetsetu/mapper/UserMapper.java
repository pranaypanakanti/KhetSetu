package com.khetsetu.mapper;

import com.khetsetu.model.User;
import com.khetsetu.model.dto.response.ProfileResponseDTO;
import com.khetsetu.model.dto.response.UserMiniResponseDTO;

import java.util.List;

public class UserMapper {

    public static ProfileResponseDTO toProfileResponse(User user) {
        ProfileResponseDTO dto = new ProfileResponseDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        return dto;
    }

    public static UserMiniResponseDTO toUserMiniResponse(User user) {
        UserMiniResponseDTO dto = new UserMiniResponseDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        return dto;
    }

}
