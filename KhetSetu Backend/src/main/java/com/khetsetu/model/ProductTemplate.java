package com.khetsetu.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_templates")
@Data
@NoArgsConstructor
public class ProductTemplate {
    @Id
    private String id;

    @Column(unique = true, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private String category;

    private Double minPricePerDay;
    private Double maxPricePerDay;

    private String description;
}