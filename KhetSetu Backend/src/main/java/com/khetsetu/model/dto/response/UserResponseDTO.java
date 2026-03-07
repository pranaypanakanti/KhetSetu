package com.khetsetu.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private UUID id;
    private String name;
    private String mobile;
    private String email;
    private String villageName;
    private Double villageLat;
    private Double villageLon;
    private Float trustScore;
    private LocalDateTime createdAt;
}