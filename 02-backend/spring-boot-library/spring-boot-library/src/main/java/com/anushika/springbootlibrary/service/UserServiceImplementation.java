//package com.anushika.springbootlibrary.service;
//
//import com.anushika.springbootlibrary.dao.UserRepository;
//import com.anushika.springbootlibrary.entity.User;
//import org.springframework.stereotype.Service;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class UserServiceImplementation implements UserDetailsService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    public UserServiceImplementation(UserRepository userRepository) {
//        this.userRepository=userRepository;
//    }
//
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByEmail(username);
//
//        if(user==null) {
//            throw new UsernameNotFoundException("User not found with this email"+username);
//
//        }
//
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        return new org.springframework.security.core.userdetails.User(
//                user.getEmail(),
//                user.getPassword(),
//                authorities);
//    }
//}
