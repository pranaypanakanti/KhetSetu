package com.khetsetu.service;

import com.khetsetu.model.Booking;
import com.khetsetu.model.Product;
import com.khetsetu.model.User;
import com.khetsetu.model.dto.request.CreateBookingRequestDTO;
import com.khetsetu.model.dto.response.BookingResponseDTO;
import com.khetsetu.model.dto.response.DashboardResponseDTO;
import com.khetsetu.model.enums.BookingStatus;
import com.khetsetu.model.enums.ProductStatus;
import com.khetsetu.repository.BookingRepository;
import com.khetsetu.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final ProductService productService;

    @Transactional
    public BookingResponseDTO createBooking(CreateBookingRequestDTO request) {
        User renter = userService.getCurrentUser();

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        if (product.getStatus() != ProductStatus.AVAILABLE) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Product is not available");
        }

        if (product.getOwner().getId().equals(renter.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot rent your own product");
        }

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End time must be after start time");
        }

        long days = Duration.between(request.getStartTime(), request.getEndTime()).toDays();
        if (days < 1) days = 1;
        double totalPrice = product.getPriceDay() * days;

        Booking booking = new Booking();
        booking.setProduct(product);
        booking.setRenter(renter);
        booking.setOwner(product.getOwner());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setTotalPrice(totalPrice);
        booking.setStatus(BookingStatus.ACTIVE);

        product.setStatus(ProductStatus.RENTED);
        productRepository.save(product);

        return mapToDTO(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponseDTO cancelBooking(UUID bookingId) {
        User currentUser = userService.getCurrentUser();
        Booking booking = getBookingForUser(bookingId, currentUser);

        if (booking.getStatus() != BookingStatus.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only active bookings can be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        booking.getProduct().setStatus(ProductStatus.AVAILABLE);
        productRepository.save(booking.getProduct());

        return mapToDTO(bookingRepository.save(booking));
    }

    @Transactional
    public BookingResponseDTO completeBooking(UUID bookingId) {
        User currentUser = userService.getCurrentUser();
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        // Only owner can mark as completed
        if (!booking.getOwner().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the owner can complete a booking");
        }

        if (booking.getStatus() != BookingStatus.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only active bookings can be completed");
        }

        booking.setStatus(BookingStatus.COMPLETED);
        booking.getProduct().setStatus(ProductStatus.AVAILABLE);
        productRepository.save(booking.getProduct());

        return mapToDTO(bookingRepository.save(booking));
    }

    public DashboardResponseDTO getDashboard() {
        User currentUser = userService.getCurrentUser();

        List<BookingResponseDTO> currentRentals = bookingRepository
                .findByRenterAndStatus(currentUser, BookingStatus.ACTIVE)
                .stream().map(this::mapToDTO).collect(Collectors.toList());

        List<BookingResponseDTO> rentalHistory = bookingRepository
                .findByRenter(currentUser)
                .stream()
                .filter(b -> b.getStatus() != BookingStatus.ACTIVE)
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        List<com.khetsetu.model.dto.response.ProductResponseDTO> myListings = productService.getMyListings();

        List<BookingResponseDTO> activeBookingsOnMyListings = bookingRepository
                .findByOwnerAndStatus(currentUser, BookingStatus.ACTIVE)
                .stream().map(this::mapToDTO).collect(Collectors.toList());

        return new DashboardResponseDTO(currentRentals, rentalHistory, myListings, activeBookingsOnMyListings);
    }

    private Booking getBookingForUser(UUID bookingId, User user) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        boolean isRenter = booking.getRenter().getId().equals(user.getId());
        boolean isOwner = booking.getOwner().getId().equals(user.getId());
        if (!isRenter && !isOwner) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
        }
        return booking;
    }

    private BookingResponseDTO mapToDTO(Booking booking) {
        return new BookingResponseDTO(
                booking.getId(),
                booking.getProduct().getId(),
                booking.getProduct().getTemplate() != null ? booking.getProduct().getTemplate().getName() : null,
                booking.getProduct().getImageUrls(),
                booking.getOwner().getId(),
                booking.getOwner().getName(),
                booking.getRenter().getId(),
                booking.getRenter().getName(),
                booking.getStartTime(),
                booking.getEndTime(),
                booking.getTotalPrice(),
                booking.getStatus().name(),
                booking.getCreatedAt()
        );
    }
}