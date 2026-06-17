package com.schedulify.timetable_generator.Repository;

import com.schedulify.timetable_generator.Entity.FacultyPreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyPreferenceRepository extends JpaRepository<FacultyPreferences,Long> {
}
