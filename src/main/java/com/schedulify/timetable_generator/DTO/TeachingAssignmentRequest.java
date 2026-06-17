package com.schedulify.timetable_generator.DTO;

import lombok.Data;

@Data
public class TeachingAssignmentRequest {
    private Long teacherId;
    private Long subjectId;
    private Long classGroupId;
    private Integer weeklyFrequency;
}
