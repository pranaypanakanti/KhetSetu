package com.khetsetu.model.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class UpdateProductRequestDTO {
    private String description;
    private String condition;
    private Double priceDay;
    private String villageId;
    private Integer maxRentalDistanceKm;
    private List<String> imageUrls;
    private String status;
}