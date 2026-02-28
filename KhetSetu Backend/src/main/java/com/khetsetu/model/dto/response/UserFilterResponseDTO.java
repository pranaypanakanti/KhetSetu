package com.khetsetu.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserFilterResponseDTO {
    private UUID id;
    private String name;
    private String email;
    private String collegeId;
    private String branch;
    private String mobileNumber;
    private String yearOfStudy;
    private String linkedinUrl;
    private String description;
}