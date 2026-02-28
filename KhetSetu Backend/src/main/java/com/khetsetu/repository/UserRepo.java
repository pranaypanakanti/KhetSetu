package com.khetsetu.repository;

import com.khetsetu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepo extends JpaRepository<User, UUID>{
    Optional<User> findByEmail(String email);
    Optional<User> findByMobile(String email);
    void deleteByEmail(String email);


}

