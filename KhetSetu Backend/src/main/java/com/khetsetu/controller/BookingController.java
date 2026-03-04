package com.khetsetu.controller;

import com.khetsetu.model.dto.request.CreateBookingRequestDTO;
import com.khetsetu.model.dto.response.BookingResponseDTO;
import com.khetsetu.model.dto.response.DashboardResponseDTO;
import com.khetsetu.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // Book a product instantly
    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(@Valid @RequestBody CreateBookingRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBooking(request));
    }

    // Cancel a booking (renter or owner)
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<BookingResponseDTO> cancelBooking(@PathVariable UUID id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    // Mark booking as completed (owner only)
    @PatchMapping("/{id}/complete")
    public ResponseEntity<BookingResponseDTO> completeBooking(@PathVariable UUID id) {
        return ResponseEntity.ok(bookingService.completeBooking(id));
    }

    // Dashboard
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponseDTO> getDashboard() {
        return ResponseEntity.ok(bookingService.getDashboard());
    }
}