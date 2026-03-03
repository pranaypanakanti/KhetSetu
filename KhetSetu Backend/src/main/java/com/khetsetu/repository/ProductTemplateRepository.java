package com.khetsetu.repository;

import com.khetsetu.model.ProductTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductTemplateRepository extends JpaRepository<ProductTemplate, String> {
    List<ProductTemplate> findByCategory(String category);
}