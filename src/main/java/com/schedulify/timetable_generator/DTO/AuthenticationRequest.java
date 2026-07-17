package com.schedulify.timetable_generator.DTO;

import com.schedulify.timetable_generator.Enums.Role;
import lombok.Data;

@Data
public class AuthenticationRequest {
    private String username;
    private String password;
}
