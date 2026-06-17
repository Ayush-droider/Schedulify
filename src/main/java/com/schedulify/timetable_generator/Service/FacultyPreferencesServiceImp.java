package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.FacultyPreferences;
import com.schedulify.timetable_generator.Repository.FacultyPreferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyPreferencesServiceImp implements FacultyPreferencesService {

    private final FacultyPreferenceRepository facultyPreferenceRepository;

    @Override
    public FacultyPreferences createFacultyPreferences(FacultyPreferences facultyPreferences) {
        return facultyPreferenceRepository.save(facultyPreferences);
    }

    @Override
    public List<FacultyPreferences> getAllFacultyPreferences() {
        return facultyPreferenceRepository.findAll();
    }
}
