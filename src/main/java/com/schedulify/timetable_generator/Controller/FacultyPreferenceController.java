package com.schedulify.timetable_generator.Controller;

import com.schedulify.timetable_generator.Entity.FacultyPreferences;
import com.schedulify.timetable_generator.Service.FacultyPreferencesService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/faculty-preferences")
public class FacultyPreferenceController {

    private final FacultyPreferencesService facultyPreferencesService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public FacultyPreferences createFacultyPreferences(@RequestBody FacultyPreferences facultyPreferences) {
        return facultyPreferencesService.createFacultyPreferences(facultyPreferences);
    }

    @GetMapping
    public List<FacultyPreferences> getFacultyPreferences(){
        return facultyPreferencesService.getAllFacultyPreferences();
    }
}
