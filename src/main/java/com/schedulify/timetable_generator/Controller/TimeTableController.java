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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    // ================= ADMIN =================

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/generate")
    public List<TimeTableEntryResponse> generateTimeTable() {
        try {
            TimeTable solved = timeTableSolverService.solve();

            return solved.getTimeTableEntries()
                    .stream()
                    .map(mapper::mapToResponse)
                    .toList();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/debug")
    public TimeTable debug() {
        return timeTableDataBuilder.dataBuilder();
    }

    // ================= ADMIN + TEACHER + STUDENT =================

    @GetMapping("/runs")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    public List<TimeTableRunResponse> getAllTimeTableRuns() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("Username : " + auth.getName());
        System.out.println("Authorities : " + auth.getAuthorities());

        return timeTableSolverService.getTimeTableRuns();
    }

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    @GetMapping("/runs/{id}")
    public List<TimeTableEntryResponse> getRunById(
            @PathVariable Long id) {

        return timeTableSolverService.getTTRunById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    @GetMapping("/stats")
    public TimeTableStatsResponse getTimeTableStats() {
        return timeTableSolverService.getTimeTableStats();
    }

    // ================= ADMIN ONLY =================

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/runs/{id}")
    public ResponseEntity<?> deleteTimeTableRunById(
            @PathVariable Long id) {

        timeTableSolverService.deleteRun(id);

        return ResponseEntity.ok("Run Deleted");
    }
}