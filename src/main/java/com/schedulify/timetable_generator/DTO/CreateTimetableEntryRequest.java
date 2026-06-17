package com.schedulify.timetable_generator.DTO;

import lombok.Data;

@Data
public class CreateTimetableEntryRequest {
    private Long TeachingAssignmentId;
    private Long RoomId;
    private Long TimeslotId;
}
