package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.Timeslot;
import com.schedulify.timetable_generator.Repository.TeacherAvailabilityRepository;
import com.schedulify.timetable_generator.Repository.TimeslotRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeSlotServiceImp implements TimeSlotService {

    public final TimeslotRepository timeslotRepository;
    private final TeacherAvailabilityRepository teacherAvailabilityRepository;

    @Override
    public Timeslot createTimeSlot(Timeslot timeSlot) {
        return timeslotRepository.save(timeSlot);
    }

    @Override
    public List<Timeslot> getAllTimeSlots() {
        return timeslotRepository.findAll();
    }

    @Override
    public Timeslot getTimeSlotById(Long id) {
        return timeslotRepository.findById(id).orElseThrow();
    }

    @Override
    public Timeslot updateTimeSlot(Timeslot timeSlot, Long id) {
        Timeslot existingTimeslot = timeslotRepository.findById(id).orElseThrow();
        existingTimeslot.setStartTime(timeSlot.getStartTime());
        existingTimeslot.setEndTime(timeSlot.getEndTime());
        existingTimeslot.setDay(timeSlot.getDay());
        return timeslotRepository.save(existingTimeslot);
    }

    @Transactional
    @Override
    public void deleteTimeSlotById(Long id) {
        teacherAvailabilityRepository.deleteByTimeslot_Id(id);
        timeslotRepository.deleteById(id);
    }
}
