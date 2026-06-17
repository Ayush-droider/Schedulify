package com.schedulify.timetable_generator.Solver;

import com.schedulify.timetable_generator.Entity.*;
import com.schedulify.timetable_generator.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TimeTableDataBuilder {

    private final TeachingAssignmentRepository teachingAssignmentRepository;
    private final TimeslotRepository timeslotRepository;
    private final RoomRepository roomRepository;
    private final TeacherAvailabilityRepository teacherAvailabilityRepository;
    private final FacultyPreferenceRepository facultyPreferencesRepository;

    public TimeTable dataBuilder(){

        List<Room> rooms=roomRepository.findAll();
        List<Timeslot> timeslots=timeslotRepository.findAll();
        List<TeachingAssignment> teachingAssignments=teachingAssignmentRepository.findAll();
        List<TeachingAvailability> teachingAvailability=teacherAvailabilityRepository.findAll();
        List<FacultyPreferences> facultyPreferences=facultyPreferencesRepository.findAll();
        List<TimeTableEntry> timeTableEntries=buildTimeTableEntry(teachingAssignments);


        TimeTable timetable=TimeTable.builder()
                .rooms(rooms)
                .timeslots(timeslots)
                .timeTableEntries(timeTableEntries)
                .teacherAvailabilities(teachingAvailability)
                .facultyPreferences(facultyPreferences)
                .build();

        return timetable;
    }
    private List<TimeTableEntry> buildTimeTableEntry(List<TeachingAssignment> teachingAssignments){
        List<TimeTableEntry> entries=new ArrayList<>();

        long planningCounter=1L;
        for(TeachingAssignment teachingAssignment:teachingAssignments){
            for(int i=0;i< teachingAssignment.getWeeklyFrequency();i++){
                TimeTableEntry timeTableEntry=new TimeTableEntry();
                timeTableEntry.setPlanningId(planningCounter++);
                timeTableEntry.setTeachingAssignment(teachingAssignment);
                entries.add(timeTableEntry);
            }
        }
        return entries;
    }
}