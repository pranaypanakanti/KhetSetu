package com.khetsetu.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "product_templates")
@Data
@NoArgsConstructor
public class ProductTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name; // e.g., "Mahindra 575 DI Tractor"

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private String category;

    private Double minPricePerDay;
    private Double maxPricePerDay;

    private String description;
}