package com.schedulify.timetable_generator.Entity;

import com.schedulify.timetable_generator.Security.Entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    @NotBlank
    private String name;

    @Email
    private String email;

    @Column(nullable = false)
    private String department;
}