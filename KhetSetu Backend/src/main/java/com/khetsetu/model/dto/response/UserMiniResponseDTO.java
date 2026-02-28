package com.khetsetu.model.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserMiniResponseDTO {
    private UUID id;
    private String name;
    private String email;
    private String collegeId;
    private String mobileNumber;
    private String branch;
    private String description;
    private String yearOfStudy;
    private String AASID;
    private String imageUrl;
    private String linkedinUrl;
}
