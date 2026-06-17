package com.schedulify.timetable_generator.Repository;

import com.schedulify.timetable_generator.Entity.TeachingAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherAvailabilityRepository extends JpaRepository<TeachingAvailability,Long> {
    void deleteByTimeslot_Id(Long id);
}