package com.schedulify.timetable_generator.Controller;

import com.schedulify.timetable_generator.Entity.Timeslot;
import com.schedulify.timetable_generator.Service.TimeSlotService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeslot")
@RequiredArgsConstructor
public class TimeSlotController {
    private final TimeSlotService timeSlotService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Timeslot createTimeslot(@RequestBody Timeslot timeslot) {
        System.out.println(timeslot);
        return timeSlotService.createTimeSlot(timeslot);
    }

    @GetMapping
    public List<Timeslot> getAllTimeslots() {
        return timeSlotService.getAllTimeSlots();
    }

    @GetMapping("/{id}")
    public Timeslot getTimeslotById(@PathVariable Long id) {
        return timeSlotService.getTimeSlotById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Timeslot updateTimeslot(@PathVariable Long id, @RequestBody Timeslot timeslot) {
        return timeSlotService.updateTimeSlot(timeslot, id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteTimeslotById(@PathVariable Long id) {
        timeSlotService.deleteTimeSlotById(id);
    }
}
