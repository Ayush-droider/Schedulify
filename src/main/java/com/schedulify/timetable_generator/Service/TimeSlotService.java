package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.Timeslot;

import java.util.List;

public interface TimeSlotService {

    Timeslot createTimeSlot(Timeslot timeSlot);
    List<Timeslot> getAllTimeSlots();

    Timeslot getTimeSlotById(Long id);
    Timeslot updateTimeSlot(Timeslot timeSlot,Long id);
    void deleteTimeSlotById(Long id);
}
