package com.schedulify.timetable_generator.Solver;

import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;
import com.schedulify.timetable_generator.Constraints.Hard.*;
import com.schedulify.timetable_generator.Constraints.Soft.ConsecutiveLecturesConstraint;
import com.schedulify.timetable_generator.Constraints.Soft.LunchBreakConstraints;
import com.schedulify.timetable_generator.Constraints.Soft.MaxLecPerDayConstraint;
import org.jspecify.annotations.NonNull;

public class TimeTableContraintsProvider implements ConstraintProvider {
    private final LabRoomConstraint labRoomConstraint=new LabRoomConstraint();
    private final RoomConstraint roomConstraint=new RoomConstraint();
    private final TeacherConstraint teacherConstraint=new TeacherConstraint();
    private final TeacherAvailabilityContraint teacherAvailabilityConstraint=new TeacherAvailabilityContraint();
    private final ClassGroupConstraints classgroupConstraints=new ClassGroupConstraints();
    private final MaxLecPerDayConstraint maxLecPerDayConstraint=new MaxLecPerDayConstraint();
    private final LunchBreakConstraints lunchBreakConstraints=new LunchBreakConstraints();
    private final ConsecutiveLecturesConstraint consecutiveLecturesConstraint=new ConsecutiveLecturesConstraint();

    @Override
    public Constraint @NonNull [] defineConstraints(@NonNull ConstraintFactory factory) {
        return new Constraint[]{
                teacherConstraint.teacherConflict(factory),
                roomConstraint.roomConflict(factory),
                teacherAvailabilityConstraint.teacherAvailabilityConflict(factory),
                labRoomConstraint.labRoomConflict(factory),
                classgroupConstraints.classGroupConstraint(factory),
                maxLecPerDayConstraint.maxLecturesPerDay(factory),
                lunchBreakConstraints.lunchBreakConstraint(factory),
                consecutiveLecturesConstraint.consecutiveLectureConflict(factory)

        };
    }
}
