package com.schedulify.timetable_generator.Entity;

import ai.timefold.solver.core.api.domain.common.PlanningId;
import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="timetable_entry")
@PlanningEntity
public class TimeTableEntry {

    @PlanningId
    private Long planningId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "teaching_assignment_id")
    private TeachingAssignment teachingAssignment;

    @ManyToOne
    @JoinColumn(name = "time_slot_id")
    @PlanningVariable(valueRangeProviderRefs = "timeslotRange")
    private Timeslot timeslot;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @PlanningVariable(valueRangeProviderRefs = "roomRange")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "timetable_id")
    private TimeTableRun timeTableRun;
}