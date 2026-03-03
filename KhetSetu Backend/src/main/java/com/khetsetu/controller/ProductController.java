package com.khetsetu.controller;

import com.khetsetu.model.dto.request.CreateProductRequestDTO;
import com.khetsetu.model.dto.request.UpdateProductRequestDTO;
import com.khetsetu.model.dto.response.ProductResponseDTO;
import com.khetsetu.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // Search available products sorted by distance
    @GetMapping("/search")
    public ResponseEntity<List<ProductResponseDTO>> search(
            @RequestParam String query,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(productService.searchProducts(query, category));
    }

    // Get single product detail
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProduct(@PathVariable UUID id) {
        return ResponseEntity.ok(productService.getProduct(id));
    }

    // Create a new listing
    @PostMapping
    public ResponseEntity<ProductResponseDTO> createListing(@Valid @RequestBody CreateProductRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createListing(request));
    }

    // Update my listing
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateListing(@PathVariable UUID id,
                                                            @RequestBody UpdateProductRequestDTO request) {
        return ResponseEntity.ok(productService.updateListing(id, request));
    }

    // Delete my listing
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteListing(@PathVariable UUID id) {
        productService.deleteListing(id);
        return ResponseEntity.noContent().build();
    }

    // Get my listings
    @GetMapping("/my")
    public ResponseEntity<List<ProductResponseDTO>> getMyListings() {
        return ResponseEntity.ok(productService.getMyListings());
    }
}