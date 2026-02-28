package com.khetsetu.service;

import com.khetsetu.mapper.UserMapper;
import com.khetsetu.model.User;
import com.khetsetu.model.dto.request.UserDetailsDTO;
import com.khetsetu.model.dto.response.ProfileResponseDTO;
import com.khetsetu.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public void saveNewUser(String email, UserDetailsDTO user){
        User newUser = userRepo.findByEmail(email).orElse(null);
        if(newUser == null) throw new RuntimeException("User not found");
        newUser.setName(user.getName());
        newUser.setCollegeId(user.getCollegeId());
        newUser.setBranch(user.getBranch());
        newUser.setMobileNumber(user.getMobileNumber());
        newUser.setYearOfStudy(user.getYearOfStudy());
        newUser.setAASID(user.getAASID());
        newUser.setDescription(user.getDescription());
        newUser.setLinkedinUrl(user.getLinkedinUrl());
        newUser.setImageUrl(user.getImageURL());
        userRepo.save(newUser);
    }

    public void updateUser(UserDetailsDTO newUser, String email){
        User oldUser = userRepo.findByEmail(email).orElse(null);
        if(oldUser == null) throw new RuntimeException("User not found");
        oldUser.setName(newUser.getName() != null && !newUser.getName().isEmpty() ? newUser.getName() : oldUser.getName());
        oldUser.setCollegeId(newUser.getCollegeId() != null && !newUser.getCollegeId().isEmpty() ? newUser.getCollegeId() : oldUser.getCollegeId());
        oldUser.setBranch(newUser.getBranch() != null && !newUser.getBranch().isEmpty() ? newUser.getBranch() : oldUser.getBranch());
        oldUser.setMobileNumber(newUser.getMobileNumber() != null && !newUser.getMobileNumber().isEmpty() ? newUser.getMobileNumber() : oldUser.getMobileNumber());
        oldUser.setYearOfStudy(newUser.getYearOfStudy() != null && !newUser.getYearOfStudy().isEmpty() ? newUser.getYearOfStudy() : oldUser.getYearOfStudy());
        oldUser.setDescription(newUser.getDescription() != null && !newUser.getDescription().isEmpty() ? newUser.getDescription() : oldUser.getDescription());
        oldUser.setAASID(newUser.getAASID() != null && !newUser.getAASID().isEmpty() ? newUser.getAASID() : oldUser.getAASID());
        oldUser.setLinkedinUrl(newUser.getLinkedinUrl() != null && !newUser.getLinkedinUrl().isEmpty() ? newUser.getLinkedinUrl() : oldUser.getLinkedinUrl());
        oldUser.setImageUrl(newUser.getImageURL() != null && !newUser.getImageURL().isEmpty() ? newUser.getImageURL() : oldUser.getImageUrl());
        userRepo.save(oldUser);
    }

    public void saveUser(User user){
        userRepo.save(user);
    }

    public ProfileResponseDTO getUserDTOByEmail(String email){
        User user = userRepo.findByEmail(email).orElse(null);
        if(user == null) throw new RuntimeException("User not found");
        return UserMapper.toProfileResponse(user);
    }

    public User getUserByEmail(String email){
        User user = userRepo.findByEmail(email).orElse(null);
        if(user == null) throw new RuntimeException("User not found");
        return user;
    }

    public void deleteUserByEmail(String email){
        User user = userRepo.findByEmail(email).orElse(null);
        if(user == null) throw new RuntimeException("User not found");
        userRepo.deleteByEmail(email);
    }

}
