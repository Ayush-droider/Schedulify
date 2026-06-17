package com.schedulify.timetable_generator.Constraints.Soft;

import ai.timefold.solver.core.api.score.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintCollectors;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.Joiners;
import com.schedulify.timetable_generator.Entity.FacultyPreferences;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;


public class MaxLecPerDayConstraint {
    public Constraint maxLecturesPerDay(ConstraintFactory factory){
        return factory.forEach(TimeTableEntry.class)
                .groupBy(entry->
                        entry.getTeachingAssignment()
                                .getTeacher(),
                        entry->entry.getTimeslot()
                                .getDay(),
                        ConstraintCollectors.count()
                )
                .join(FacultyPreferences.class,
                        Joiners.equal((teacher, day, count)->teacher,
                                FacultyPreferences::getTeacher))
                .filter((teacher,day,lectureCount,preference)->preference.getMaxLecturesPerDay()!=null
                & lectureCount> preference.getMaxLecturesPerDay())
                .penalize(
                        HardSoftScore.ONE_SOFT,
                        (teacher,day,lectureCount,preference)->lectureCount- preference.getMaxLecturesPerDay()
                )
                .asConstraint("Max Lectures Per Day");
    }
}
