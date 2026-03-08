package com.khetsetu.controller;

import com.khetsetu.model.ProductTemplate;
import com.khetsetu.model.Village;
import com.khetsetu.model.dto.response.VillageResponseDTO;
import com.khetsetu.repository.ProductTemplateRepository;
import com.khetsetu.repository.VillageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final ProductTemplateRepository productTemplateRepository;
    private final VillageRepository villageRepository;

    @GetMapping("/templates")
    public ResponseEntity<List<ProductTemplate>> getTemplates() {
        return ResponseEntity.ok(productTemplateRepository.findAll());
    }

    @GetMapping("/villages/search")
    public ResponseEntity<List<VillageResponseDTO>> searchVillages(@RequestParam String query) {
        return ResponseEntity.ok(
                villageRepository.searchByAddress(query).stream()
                        .map(v -> new VillageResponseDTO(v.getId(), v.getAddress(), v.getLatitude(), v.getLongitude()))
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("/health-check")
    public String healthCheck(){
        return "Positive";
    }
}