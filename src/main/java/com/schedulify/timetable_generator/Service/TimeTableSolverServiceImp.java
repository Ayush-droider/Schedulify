package com.schedulify.timetable_generator.Service;

import ai.timefold.solver.core.api.solver.SolverJob;
import ai.timefold.solver.core.api.solver.SolverManager;
import com.schedulify.timetable_generator.DTO.TimeTableEntryResponse;
import com.schedulify.timetable_generator.DTO.TimeTableRunResponse;
import com.schedulify.timetable_generator.DTO.TimeTableStatsResponse;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;
import com.schedulify.timetable_generator.Entity.TimeTableRun;
import com.schedulify.timetable_generator.Mapper.TimeTableEntryMapper;
import com.schedulify.timetable_generator.Repository.*;
import com.schedulify.timetable_generator.Solver.TimeTable;
import com.schedulify.timetable_generator.Solver.TimeTableDataBuilder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class TimeTableSolverServiceImp implements TimeTableSolverService {

    private final SolverManager<TimeTable> solverManager;
    private final TimeTableDataBuilder timeTableDataBuilder;
    private final TimeTableRunRepository timeTableRunRepository;
    private final TimeTableEntryRepository timeTableEntryRepository;
    private final TimeTableEntryMapper mapper;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository  subjectRepository;
    private final RoomRepository roomRepository;
    private final ClassGroupRepository classGroupRepository;

    @Override
    public TimeTable solve() throws ExecutionException, InterruptedException {
        TimeTable problem = timeTableDataBuilder.dataBuilder();
        SolverJob<TimeTable> job = solverManager.solve(1L, problem);
        TimeTable solved = job.getFinalBestSolution();

        TimeTableRun run= TimeTableRun
                .builder()
                .generatedAt(LocalDateTime.now())
                .score(solved.getScore().toString())
                .status("COMPLETED")
                .build();

        run=timeTableRunRepository.save(run);

        for(TimeTableEntry timeTableEntry : solved.getTimeTableEntries()){
            timeTableEntry.setTimeTableRun(run);
        }

        timeTableEntryRepository.saveAll(solved.getTimeTableEntries());

        return solved;
    }

    @Override
    public List<TimeTableRunResponse> getTimeTableRuns() {
        return timeTableRunRepository.findAll()
                .stream()
                .map(run->new TimeTableRunResponse(
                        run.getId(),
                        run.getGeneratedAt(),
                        run.getScore(),
                        run.getStatus()
                )).toList();
    }

    @Override
    public List<TimeTableEntryResponse> getTTRunById(Long runId) {

        return timeTableEntryRepository
                .findByTimeTableRunId(runId)
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public void deleteRun(Long id) {
        timeTableEntryRepository.deleteByTimeTableRun_Id(id);
        timeTableRunRepository.deleteById(id);
    }

    @Override
    public TimeTableStatsResponse getTimeTableStats() {

        List<TimeTableRun> runs = timeTableRunRepository.findAll();

        Long totalRuns = (long) runs.size();

        Long latestRunId = runs.stream()
                .map(TimeTableRun::getId)
                .max(Long::compareTo)
                .orElse(null);

        String bestScore = runs.stream()
                .map(TimeTableRun::getScore)
                .findFirst()
                .orElse("N/A");

        Long totalTeachers = teacherRepository.count();
        Long totalSubjects = subjectRepository.count();
        Long totalRooms = roomRepository.count();
        Long totalClassGroups = classGroupRepository.count();

        return new TimeTableStatsResponse(
                totalRuns,
                latestRunId,
                bestScore,
                totalTeachers,
                totalSubjects,
                totalRooms,
                totalClassGroups
        );
    }
}