package com.khetsetu.service;

import com.khetsetu.mapper.UserMapper;
import com.khetsetu.model.User;
import com.khetsetu.model.dto.request.UserDetailsDTO;
import com.khetsetu.model.dto.response.ProfileResponseDTO;
import com.khetsetu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public void saveNewUser(String email, UserDetailsDTO user){
        User newUser = userRepo.findByEmail(email).orElse(null);
        if(newUser == null) throw new RuntimeException("User not found");
        newUser.setName(user.getName());
        userRepo.save(newUser);
    }

    public void updateUser(UserDetailsDTO newUser, String email){
        User oldUser = userRepo.findByEmail(email).orElse(null);
        if(oldUser == null) throw new RuntimeException("User not found");
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
