package com.khetsetu.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsDTO {
    @NotBlank
    private String name;
    @NotBlank
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Collage id must contain exactly 10 digits"
    )
    private String collegeId;
    private String branch;
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Mobile number must contain exactly 10 digits"
    )
    private String mobileNumber;
    private String yearOfStudy;
    private String description;
    private String AASID;
    private String imageURL;
    private String linkedinUrl;
}
