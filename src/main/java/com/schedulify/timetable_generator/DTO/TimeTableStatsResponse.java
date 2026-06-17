package com.schedulify.timetable_generator.DTO;

public record TimeTableStatsResponse(
        Long totalRun,
        Long latestRun,
        String bestScore,
        Long totalTeachers,
        Long totalSubjects,
        Long totalRooms,
        Long totalClassGroups
) {
}
