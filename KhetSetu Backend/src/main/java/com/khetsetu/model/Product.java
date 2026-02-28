package com.khetsetu.model;

import com.khetsetu.model.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private ProductTemplate template;

    private String description;

    private String condition;  // New, Like New, Good, Fair

    private String type;

    private Double priceDay;

    @ManyToOne
    @JoinColumn(name = "village_id")
    private Village village;

    private Integer maxRentalDistanceKm;

    @ElementCollection
    private List<String> imageUrls;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "product")
    private List<Booking> bookings;
}