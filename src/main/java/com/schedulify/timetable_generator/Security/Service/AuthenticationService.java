package com.schedulify.timetable_generator.Security.Service;

import com.schedulify.timetable_generator.DTO.AuthenticationRequest;
import com.schedulify.timetable_generator.DTO.AuthenticationResponse;
import com.schedulify.timetable_generator.DTO.RegisterRequest;
import com.schedulify.timetable_generator.Enums.Role;
import com.schedulify.timetable_generator.Security.Entity.User;
import com.schedulify.timetable_generator.Security.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(
            RegisterRequest request) {

        User user = User.builder()
                .username(request.getUsername())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        userRepo.save(user);

        String token =
                jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .build();
    }

    public AuthenticationResponse authenticate(
            AuthenticationRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        User user =
                userRepo.findByUsername(
                                request.getUsername())
                        .orElseThrow();

        String token =
                jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .build();
    }
}
