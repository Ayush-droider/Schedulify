package com.schedulify.timetable_generator.Controller;

import com.schedulify.timetable_generator.DTO.CreateTimetableEntryRequest;
import com.schedulify.timetable_generator.DTO.TimeTableEntryResponse;
import com.schedulify.timetable_generator.Service.TimeTableEntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable-entries")
@RequiredArgsConstructor
public class TimeTableEntryController {

    private final TimeTableEntryService timetableEntryService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public TimeTableEntryResponse createEntry(@RequestBody CreateTimetableEntryRequest request) {
        return timetableEntryService.createEntry(request);
    }

    @GetMapping
    public List<TimeTableEntryResponse> getAllEntries() {
        return timetableEntryService.getAllEntries();
    }
}
