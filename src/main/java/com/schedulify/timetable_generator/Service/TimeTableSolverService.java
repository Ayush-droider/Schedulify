package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.DTO.TimeTableEntryResponse;
import com.schedulify.timetable_generator.DTO.TimeTableRunResponse;
import com.schedulify.timetable_generator.DTO.TimeTableStatsResponse;
import com.schedulify.timetable_generator.Solver.TimeTable;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface TimeTableSolverService {
    TimeTable solve() throws ExecutionException, InterruptedException;
    List<TimeTableRunResponse> getTimeTableRuns();
    List<TimeTableEntryResponse> getTTRunById(Long runId);
    void deleteRun(Long id);
    TimeTableStatsResponse getTimeTableStats();
}
