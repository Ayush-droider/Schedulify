package com.schedulify.timetable_generator.Constraints.Hard;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;
import com.schedulify.timetable_generator.Enums.roomType;

public class LabRoomConstraint {
    public Constraint labRoomConflict(ConstraintFactory factory) {
        return factory
                .forEach(TimeTableEntry.class)
                .filter(entry ->
                        Boolean.TRUE.equals(
                                entry
                                        .getTeachingAssignment()
                                        .getSubject()
                                        .getIsLab()
                        )
                        &&
                                entry.getRoom()!=null
                        &&
                            entry
                                    .getRoom()
                                    .getRoomType()
                                    .equals(roomType.CLASSROOM)
                )
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("LabRoom Conflict");
    }
}
