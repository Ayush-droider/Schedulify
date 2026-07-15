package com.schedulify.timetable_generator.Controller;

import com.schedulify.timetable_generator.DTO.TimeTableEntryResponse;
import com.schedulify.timetable_generator.DTO.TimeTableRunResponse;
import com.schedulify.timetable_generator.DTO.TimeTableStatsResponse;
import com.schedulify.timetable_generator.Service.TimeTableSolverService;
import com.schedulify.timetable_generator.Solver.TimeTable;
import com.schedulify.timetable_generator.Solver.TimeTableDataBuilder;
import com.schedulify.timetable_generator.Mapper.TimeTableEntryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/timetable")
@RequiredArgsConstructor
public class TimeTableController {

    private final TimeTableSolverService timeTableSolverService;
    private final TimeTableEntryMapper mapper;
    private final TimeTableDataBuilder timeTableDataBuilder;

    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/generate")
    public List<TimeTableEntryResponse> generateTimeTable()
            throws ExecutionException, InterruptedException {

        System.out.println("Generate API Hit");

        TimeTable solved = timeTableSolverService.solve();

        return solved.getTimeTableEntries()
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }

    // ADMIN ONLY (debug APIs should never be public)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/debug")
    public TimeTable debug() {
        System.out.println("Working");
        return timeTableDataBuilder.dataBuilder();
    }

    // USER + ADMIN
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/runs")
    public List<TimeTableRunResponse> getAllTimeTableRuns() {
        return timeTableSolverService.getTimeTableRuns();
    }

    // USER + ADMIN
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/runs/{id}")
    public List<TimeTableEntryResponse> getRunById(
            @PathVariable Long id) {

        return timeTableSolverService.getTTRunById(id);
    }

    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/runs/{id}")
    public ResponseEntity<?> deleteTimeTableRunById(
            @PathVariable Long id) {

        timeTableSolverService.deleteRun(id);

        return ResponseEntity.ok("Run Deleted");
    }

    // USER + ADMIN
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/stats")
    public TimeTableStatsResponse getTimeTableStats() {
        return timeTableSolverService.getTimeTableStats();
    }
}