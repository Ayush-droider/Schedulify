package com.schedulify.timetable_generator.DTO;

import lombok.Data;

@Data
public class TeachingAvailabilityRequest {
    private Long teacherId;
    private Long timeslotId;
    private Boolean available;
}
