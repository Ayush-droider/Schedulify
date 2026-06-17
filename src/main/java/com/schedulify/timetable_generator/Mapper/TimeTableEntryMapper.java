package com.schedulify.timetable_generator.Mapper;

import com.schedulify.timetable_generator.DTO.TimeTableEntryResponse;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;
import org.springframework.stereotype.Component;

@Component
public class TimeTableEntryMapper {
    public TimeTableEntryResponse mapToResponse(TimeTableEntry entry) {

        return new TimeTableEntryResponse(
                entry.getId(),
                entry.getTeachingAssignment()
                        .getSubject()
                        .getSubjectName(),
                entry.getTeachingAssignment()
                        .getTeacher().getName(),
                entry.getTeachingAssignment()
                        .getClassGroup()
                        .getName(),
                entry.getRoom()
                        .getRoomNumber(),
                entry.getTimeslot()
                        .getDay().toString(),
                entry.getTimeslot()
                        .getStartTime(),
                entry.getTimeslot()
                        .getEndTime()
        );
    }
}
