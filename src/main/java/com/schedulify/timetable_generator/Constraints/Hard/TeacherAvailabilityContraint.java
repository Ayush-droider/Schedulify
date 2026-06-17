package com.schedulify.timetable_generator.Constraints.Hard;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Joiners;
import com.schedulify.timetable_generator.Entity.TeachingAvailability;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;

public class TeacherAvailabilityContraint {
    public Constraint teacherAvailabilityConflict(ConstraintFactory constraintFactory) {
        return constraintFactory
                .forEach(TimeTableEntry.class)
                .join(
                        TeachingAvailability.class,
                        Joiners.equal(
                                entry ->
                                        entry.getTeachingAssignment()
                                                .getTeacher(),
                                TeachingAvailability::getTeacher
                        ),
                        Joiners.equal(
                                TimeTableEntry::getTimeslot,
                                TeachingAvailability::getTimeslot
                        )
                )
                .filter(
                        (entry , availability)
                                -> !availability.getAvailable()
                )
                .penalize(
                        HardSoftScore.ONE_HARD)
                .asConstraint(
                        "Teacher Unavailable");
    }
}
