package com.khetsetu.repository;

import com.khetsetu.model.Booking;
import com.khetsetu.model.User;
import com.khetsetu.model.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    // All bookings where I am the renter
    List<Booking> findByRenter(User renter);

    // Active rentals I hold
    List<Booking> findByRenterAndStatus(User renter, BookingStatus status);

    // Bookings on my listings
    List<Booking> findByOwner(User owner);

    List<Booking> findByOwnerAndStatus(User owner, BookingStatus status);
}
