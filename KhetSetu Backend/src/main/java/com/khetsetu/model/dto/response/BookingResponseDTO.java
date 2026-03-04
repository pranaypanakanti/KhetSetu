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
public class BookingResponseDTO {
    private UUID id;
    private UUID productId;
    private String productName;
    private List<String> productImageUrls;
    private UUID ownerId;
    private String ownerName;
    private UUID renterId;
    private String renterName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double totalPrice;
    private String status;
    private LocalDateTime createdAt;
}