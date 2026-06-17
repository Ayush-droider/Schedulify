package com.schedulify.timetable_generator.DTO;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String username;
    private String password;
}
