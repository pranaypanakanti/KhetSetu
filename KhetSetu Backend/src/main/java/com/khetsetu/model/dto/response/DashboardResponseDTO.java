package com.khetsetu.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponseDTO {
    private List<BookingResponseDTO> currentRentals;   // products I'm currently renting
    private List<BookingResponseDTO> rentalHistory;    // my past rentals
    private List<ProductResponseDTO> myListings;       // products I've listed
    private List<BookingResponseDTO> activeBookingsOnMyListings; // others renting my stuff
}