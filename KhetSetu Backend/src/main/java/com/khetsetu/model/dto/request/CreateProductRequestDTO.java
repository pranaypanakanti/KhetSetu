package com.khetsetu.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
public class CreateProductRequestDTO {
    @NotBlank
    private String templateId;

    private String description;

    @NotBlank
    private String condition; // New, Like New, Good, Fair

    @NotNull
    private Double priceDay;

    private String villageId;

    private Integer maxRentalDistanceKm;

    private List<String> imageUrls;
}