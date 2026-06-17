package com.schedulify.timetable_generator.Constraints.Soft;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Joiners;
import com.schedulify.timetable_generator.Entity.FacultyPreferences;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;

import java.time.LocalTime;

public class LunchBreakConstraints {
    public Constraint lunchBreakConstraint(ConstraintFactory factory){
        return factory
                .forEach(TimeTableEntry.class)
                .join(FacultyPreferences.class,

                        Joiners.equal(entry->
                                entry.getTeachingAssignment()
                                        .getTeacher(),
                                FacultyPreferences::getTeacher))
                .filter(
                        (entry,preference)->
                                Boolean.TRUE.equals(
                                        preference.getPreferLunchBreak()
                                )
                )
                .filter(
                        (entry,preference)->{
                            LocalTime start =
                                    entry.getTimeslot().getStartTime();
                            LocalTime end =
                                    entry.getTimeslot().getEndTime();
                            LocalTime lunchStart= LocalTime.of(13,0);
                            LocalTime lunchEnd= LocalTime.of(14,0);

                            return start.isBefore(lunchEnd)
                                    &&
                                    end.isAfter(lunchStart);
                        }
                )
                .penalize(HardSoftScore.ONE_SOFT)
                .asConstraint("Lunch Break Conflict");
    }
}
