package com.khetsetu.repository;

import com.khetsetu.model.Product;
import com.khetsetu.model.User;
import com.khetsetu.model.enums.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    List<Product> findByOwner(User owner);

    List<Product> findByOwnerAndStatus(User owner, ProductStatus status);

    @Query("SELECT p FROM Product p " +
            "JOIN p.template t " +
            "WHERE p.status = 'AVAILABLE' " +
            "AND (LOWER(t.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(CAST(t.category AS string)) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "AND (:category IS NULL OR t.category = :category)")
    List<Product> searchAvailable(
            @Param("query") String query,
            @Param("category") String category
    );
}