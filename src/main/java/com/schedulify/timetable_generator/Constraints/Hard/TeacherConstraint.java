package com.schedulify.timetable_generator.Constraints.Hard;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Joiners;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;

public class TeacherConstraint {
    public Constraint teacherConflict(ConstraintFactory constraintFactory) {
        return constraintFactory
                .forEachUniquePair(
                        TimeTableEntry.class,
                        Joiners
                                .equal(entry->
                                        entry.getTeachingAssignment()
                                .getTeacher()),
                        Joiners
                                .equal(TimeTableEntry::getTimeslot
                                )
                )
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Teacher Conflict");
    }
}
