package com.schedulify.timetable_generator.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TimeTableEntryResponse {

    private Long id;

    private String subjectName;
    private String teacherName;
    private String classGroupName;
    private String roomNumber;
    private String day;
    private LocalTime startTime;
    private LocalTime endTime;
}