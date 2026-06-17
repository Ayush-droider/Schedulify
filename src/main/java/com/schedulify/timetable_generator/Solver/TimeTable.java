package com.schedulify.timetable_generator.Solver;

import ai.timefold.solver.core.api.domain.solution.PlanningEntityCollectionProperty;
import ai.timefold.solver.core.api.domain.solution.PlanningScore;
import ai.timefold.solver.core.api.domain.solution.PlanningSolution;
import ai.timefold.solver.core.api.domain.solution.ProblemFactCollectionProperty;
import ai.timefold.solver.core.api.domain.valuerange.ValueRangeProvider;
import ai.timefold.solver.core.api.score.HardSoftScore;
import com.schedulify.timetable_generator.Entity.*;
import lombok.*;

import java.util.List;

@PlanningSolution
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TimeTable {

    @ValueRangeProvider(id = "roomRange")
    @ProblemFactCollectionProperty
    List<Room> rooms;
    @ValueRangeProvider(id="timeslotRange")
    @ProblemFactCollectionProperty
    List<Timeslot> timeslots;
    @PlanningEntityCollectionProperty
    List<TimeTableEntry> timeTableEntries;
    @ProblemFactCollectionProperty
    private List<TeachingAvailability> teacherAvailabilities;
    @ProblemFactCollectionProperty
    List<FacultyPreferences> facultyPreferences;
    @PlanningScore
    private HardSoftScore score;
}
