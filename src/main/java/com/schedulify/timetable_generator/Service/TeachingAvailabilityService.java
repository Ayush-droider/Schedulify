package com.schedulify.timetable_generator.Service;


import com.schedulify.timetable_generator.DTO.TeachingAvailabilityRequest;
import com.schedulify.timetable_generator.Entity.TeachingAvailability;

import java.util.List;

public interface TeachingAvailabilityService {

    TeachingAvailability createTeachingAvailability(TeachingAvailabilityRequest request);
    List<TeachingAvailability> getAllTeachingAvailability();
    TeachingAvailability getTeachingAvailabilityById(Long id);
    TeachingAvailability updateTeachingAvailability(Long id, TeachingAvailabilityRequest request);
    void deleteTeachingAvailability(Long id);
}
