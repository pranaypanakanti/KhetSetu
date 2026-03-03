package com.khetsetu.service;

import com.khetsetu.model.Product;
import com.khetsetu.model.ProductTemplate;
import com.khetsetu.model.User;
import com.khetsetu.model.Village;
import com.khetsetu.model.dto.request.CreateProductRequestDTO;
import com.khetsetu.model.dto.request.UpdateProductRequestDTO;
import com.khetsetu.model.dto.response.ProductResponseDTO;
import com.khetsetu.model.enums.ProductStatus;
import com.khetsetu.repository.ProductRepository;
import com.khetsetu.repository.ProductTemplateRepository;
import com.khetsetu.repository.VillageRepository;
import com.khetsetu.utilis.GeoUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductTemplateRepository productTemplateRepository;
    private final VillageRepository villageRepository;
    private final UserService userService;

    public ProductResponseDTO createListing(CreateProductRequestDTO request) {
        User currentUser = userService.getCurrentUser();

        ProductTemplate template = productTemplateRepository.findById(request.getTemplateId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Template not found"));

        Village village = null;
        if (request.getVillageId() != null) {
            village = villageRepository.findById(request.getVillageId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Village not found"));
        } else if (currentUser.getVillage() != null) {
            village = currentUser.getVillage(); // default to user's village
        }

        Product product = new Product();
        product.setOwner(currentUser);
        product.setTemplate(template);
        product.setDescription(request.getDescription());
        product.setCondition(request.getCondition());
        product.setPriceDay(request.getPriceDay());
        product.setVillage(village);
        product.setMaxRentalDistanceKm(request.getMaxRentalDistanceKm());
        product.setImageUrls(request.getImageUrls());
        product.setStatus(ProductStatus.AVAILABLE);

        return mapToDTO(productRepository.save(product), null);
    }

    public ProductResponseDTO updateListing(UUID productId, UpdateProductRequestDTO request) {
        User currentUser = userService.getCurrentUser();
        Product product = getOwnedProduct(productId, currentUser);

        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getCondition() != null) product.setCondition(request.getCondition());
        if (request.getPriceDay() != null) product.setPriceDay(request.getPriceDay());
        if (request.getMaxRentalDistanceKm() != null) product.setMaxRentalDistanceKm(request.getMaxRentalDistanceKm());
        if (request.getImageUrls() != null) product.setImageUrls(request.getImageUrls());
        if (request.getStatus() != null) product.setStatus(ProductStatus.valueOf(request.getStatus()));
        if (request.getVillageId() != null) {
            Village village = villageRepository.findById(request.getVillageId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Village not found"));
            product.setVillage(village);
        }

        return mapToDTO(productRepository.save(product), null);
    }

    public void deleteListing(UUID productId) {
        User currentUser = userService.getCurrentUser();
        Product product = getOwnedProduct(productId, currentUser);

        if (product.getStatus() == ProductStatus.RENTED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cannot delete a product that is currently rented");
        }

        productRepository.delete(product);
    }

    public ProductResponseDTO getProduct(UUID productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        return mapToDTO(product, null);
    }

    public List<ProductResponseDTO> searchProducts(String query, String category) {
        User currentUser = userService.getCurrentUser();
        Double userLat = currentUser.getVillage() != null ? currentUser.getVillage().getLatitude() : null;
        Double userLon = currentUser.getVillage() != null ? currentUser.getVillage().getLongitude() : null;

        String categoryFilter = (category != null && !category.isBlank() && !category.equals("ALL"))
                ? category
                : null;

        List<Product> products = productRepository.searchAvailable(query, categoryFilter);

        return products.stream()
                .map(p -> {
                    Double distance = null;
                    if (userLat != null && userLon != null && p.getVillage() != null) {
                        distance = GeoUtil.haversineDistance(
                                userLat, userLon,
                                p.getVillage().getLatitude(), p.getVillage().getLongitude()
                        );
                        if (p.getMaxRentalDistanceKm() != null && distance > p.getMaxRentalDistanceKm()) {
                            return null;
                        }
                    }
                    return mapToDTO(p, distance);
                })
                .filter(p -> p != null)
                .sorted(Comparator.comparingDouble(p -> p.getDistanceKm() != null ? p.getDistanceKm() : Double.MAX_VALUE))
                .collect(Collectors.toList());
    }

    public List<ProductResponseDTO> getMyListings() {
        User currentUser = userService.getCurrentUser();
        return productRepository.findByOwner(currentUser).stream()
                .map(p -> mapToDTO(p, null))
                .collect(Collectors.toList());
    }

    private Product getOwnedProduct(UUID productId, User currentUser) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        if (!product.getOwner().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't own this product");
        }
        return product;
    }

    public ProductResponseDTO mapToDTO(Product product, Double distanceKm) {
        return new ProductResponseDTO(
                product.getId(),
                product.getOwner().getName(),
                product.getOwner().getId(),
                product.getTemplate() != null ? product.getTemplate().getName() : null,
                product.getTemplate() != null ? product.getTemplate().getCategory() : null,
                product.getDescription(),
                product.getCondition(),
                product.getPriceDay(),
                product.getVillage() != null ? product.getVillage().getAddress() : null,
                product.getVillage() != null ? product.getVillage().getLatitude() : null,
                product.getVillage() != null ? product.getVillage().getLongitude() : null,
                product.getMaxRentalDistanceKm(),
                product.getImageUrls(),
                product.getStatus().name(),
                distanceKm,
                product.getCreatedAt()
        );
    }
}