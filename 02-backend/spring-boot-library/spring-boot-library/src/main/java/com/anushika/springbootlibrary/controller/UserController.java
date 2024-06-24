//package com.anushika.springbootlibrary.controller;
//
//import com.anushika.springbootlibrary.config.JwtProvider;
//import com.anushika.springbootlibrary.dao.UserRepository;
//import com.anushika.springbootlibrary.entity.AuthResponse;
//import com.anushika.springbootlibrary.entity.User;
//import com.anushika.springbootlibrary.service.UserService;
//import com.anushika.springbootlibrary.service.UserServiceImplementation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping
//public class UserController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private UserServiceImplementation customUserDetails;
//
//    @PostMapping("/signup")
//    public ResponseEntity<AuthResponse> createUserHandler (@RequestBody User user) {
//        String email = user.getEmail();
//        String password = user.getPassword();
//
//        User isEmailExist = userRepository.findByEmail(email);
//        if (isEmailExist != null) {
////            throw new Exception("Email is already registered!");
//        }
//
//        User createdUser = new User();
//        createdUser.setEmail(email);
//        createdUser.setPassword(password);
//
//        User savedUser = userRepository.save(createdUser);
//        userRepository.save(savedUser);
//
//        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String token = JwtProvider.generateToken(authentication);
//
//        AuthResponse authResponse = new AuthResponse();
//        authResponse.setJwt(token);
//        authResponse.setMessage("Register Success");
//        authResponse.setStatus(true);
//
//        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.OK);
//    }
//
//    @PostMapping("/signin")
//    public ResponseEntity<AuthResponse> signin(@RequestBody User loginRequest) {
//        String username = loginRequest.getEmail();
//        String password = loginRequest.getPassword();
//
//        System.out.println(username+"-------"+password);
//
//        Authentication authentication = authenticate(username,password);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        String token = JwtProvider.generateToken(authentication);
//        AuthResponse authResponse = new AuthResponse();
//
//        authResponse.setMessage("Login success");
//        authResponse.setJwt(token);
//        authResponse.setStatus(true);
//
//        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.OK);
//    }
//
//    private Authentication authenticate(String username, String password) {
//
//        System.out.println(username+"---++----"+password);
//
//        UserDetails userDetails = customUserDetails.loadUserByUsername(username);
//
//        System.out.println("Sig in in user details"+ userDetails);
//
//        if(userDetails == null) {
//            System.out.println("Sign in details - null" + userDetails);
//
//            throw new BadCredentialsException("Invalid username and password");
//        }
//        if(!passwordEncoder.matches(password,userDetails.getPassword())) {
//            System.out.println("Sign in userDetails - password mismatch"+userDetails);
//
//            throw new BadCredentialsException("Invalid password");
//
//        }
//        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
//
//    }
//}
