package com.schedulify.timetable_generator.Controller;

import com.schedulify.timetable_generator.DTO.TeachingAvailabilityRequest;
import com.schedulify.timetable_generator.Entity.TeachingAvailability;
import com.schedulify.timetable_generator.Service.TeachingAvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teaching-availability")
@RequiredArgsConstructor
public class TeachingAvailabilityController {
    private final TeachingAvailabilityService teachingAvailabilityService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public TeachingAvailability createTeachingAvailability(@RequestBody TeachingAvailabilityRequest teachingAvailabilityRequest ) {
        return  teachingAvailabilityService.createTeachingAvailability(teachingAvailabilityRequest);
    }

    @GetMapping
    public List<TeachingAvailability> getAllTeachingAvailability() {
        return teachingAvailabilityService.getAllTeachingAvailability();
    }

    @GetMapping("/{id}")
    public TeachingAvailability getTeachingAvailability(@PathVariable Long id) {
        return teachingAvailabilityService.getTeachingAvailabilityById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public TeachingAvailability updateTeachingAvailability(
            @PathVariable Long id,
            @RequestBody TeachingAvailabilityRequest request) {

        return teachingAvailabilityService
                .updateTeachingAvailability(id, request);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteTeachingAvailability(
            @PathVariable Long id) {

        teachingAvailabilityService
                .deleteTeachingAvailability(id);
    }
}
