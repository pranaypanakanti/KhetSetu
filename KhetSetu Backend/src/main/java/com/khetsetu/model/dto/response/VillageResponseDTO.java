package com.khetsetu.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VillageResponseDTO {
    private String id;
    private String address;
    private Double latitude;
    private Double longitude;
}