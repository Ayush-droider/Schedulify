package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.DTO.CreateTimetableEntryRequest;
import com.schedulify.timetable_generator.DTO.TimeTableEntryResponse;

import java.util.List;

public interface TimeTableEntryService {
    TimeTableEntryResponse createEntry(CreateTimetableEntryRequest request);
    List<TimeTableEntryResponse> getAllEntries();
}
