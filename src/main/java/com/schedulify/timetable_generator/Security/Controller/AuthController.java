package com.schedulify.timetable_generator.Security.Controller;

import com.schedulify.timetable_generator.DTO.AuthenticationRequest;
import com.schedulify.timetable_generator.DTO.AuthenticationResponse;
import com.schedulify.timetable_generator.DTO.RegisterRequest;
import com.schedulify.timetable_generator.Security.Service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public AuthenticationResponse register(
            @RequestBody RegisterRequest request) {

        return service.register(request);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(
            @RequestBody AuthenticationRequest request) {

        return service.authenticate(request);
    }
}
