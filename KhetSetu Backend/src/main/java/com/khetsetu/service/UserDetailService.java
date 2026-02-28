package com.khetsetu.service;

import com.khetsetu.model.User;
import com.khetsetu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String mobile) throws UsernameNotFoundException {
        User user = userRepo.findByMobile(mobile).orElse(null);
        if(user != null){
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getMobile())
                    .build();
        }
        throw new UsernameNotFoundException("User not found with username: "+mobile);
    }
}