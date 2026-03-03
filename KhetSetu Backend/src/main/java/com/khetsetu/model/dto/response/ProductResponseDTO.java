package com.khetsetu.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private UUID id;
    private String ownerName;
    private UUID ownerId;
    private String templateName;
    private String category;
    private String description;
    private String condition;
    private Double priceDay;
    private String villageName;
    private Double villageLat;
    private Double villageLon;
    private Integer maxRentalDistanceKm;
    private List<String> imageUrls;
    private String status;
    private Double distanceKm; // null when not a search result
    private LocalDateTime createdAt;
}