package com.schedulify.timetable_generator.Constraints.Soft;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Joiners;
import com.schedulify.timetable_generator.Entity.FacultyPreferences;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;
import com.schedulify.timetable_generator.Entity.Timeslot;

import java.time.Duration;
import java.time.LocalTime;

public class ConsecutiveLecturesConstraint {
    public Constraint consecutiveLectureConflict(ConstraintFactory factory){
        return factory.forEachUniquePair(TimeTableEntry.class,
                Joiners.equal(entry->
                        entry.getTeachingAssignment()
                                .getTeacher()),
                Joiners.equal(entry->entry.getTimeslot().getDay()))
                .join(
                        FacultyPreferences.class,

                        Joiners.equal(
                                (entry1, entry2) ->
                                        entry1.getTeachingAssignment()
                                                .getTeacher(),

                                FacultyPreferences::getTeacher
                        )
                )
                .filter((entry1,entry2,preferences)->
                        Boolean.TRUE.equals(preferences.getAvoidConsecutiveLectures()))
                .filter((entry1,entry2,preferences)->{
                    Timeslot slot1=entry1.getTimeslot();
                    Timeslot slot2=entry2.getTimeslot();

                    LocalTime earlierEnd;
                    LocalTime laterStart;

                    if(slot1.getStartTime().isBefore(slot2.getStartTime())){
                        earlierEnd = slot1.getStartTime();
                        laterStart = slot2.getStartTime();
                    }
                    else{
                        earlierEnd = slot2.getStartTime();
                        laterStart=slot1.getStartTime();
                    }
                    long gap=Duration.between(earlierEnd,laterStart).toMinutes();
                    return gap<=15;
                })
                .penalize(HardSoftScore.ONE_SOFT)
                .asConstraint("Consecutive Lectures Conflict");
    }
}
