package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.DTO.TeachingAssignmentRequest;
import com.schedulify.timetable_generator.Entity.TeachingAssignment;

import java.util.List;

public interface TeachingAssignmentService {
    TeachingAssignment createTeachingAssignment(TeachingAssignmentRequest dto);
    List<TeachingAssignment> getAllTeachingAssignment();

    TeachingAssignment getTeachingAssignmentById(Long id);

    TeachingAssignment updateTeachingAssignment(Long id, TeachingAssignmentRequest dto);

    void deleteTeachingAssignment(Long id);
}
