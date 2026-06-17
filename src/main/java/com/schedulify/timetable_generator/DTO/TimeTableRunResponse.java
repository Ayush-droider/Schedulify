package com.schedulify.timetable_generator.DTO;

import java.time.LocalDateTime;

public record TimeTableRunResponse(
        Long id,
        LocalDateTime generatedAt,
        String score,
        String status
) {
}
