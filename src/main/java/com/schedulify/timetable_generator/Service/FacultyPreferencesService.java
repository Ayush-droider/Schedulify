package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.FacultyPreferences;

import java.util.List;

public interface FacultyPreferencesService {
    FacultyPreferences createFacultyPreferences(FacultyPreferences facultyPreferences);
    List<FacultyPreferences> getAllFacultyPreferences();
}
