package com.schedulify.timetable_generator.Controller;

import com.schedulify.timetable_generator.DTO.TeachingAssignmentRequest;
import com.schedulify.timetable_generator.Entity.TeachingAssignment;
import com.schedulify.timetable_generator.Service.TeachingAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teaching-assignments")
@RequiredArgsConstructor
public class TeachingAssignmentController {

    private final TeachingAssignmentService teachingAssignmentService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public TeachingAssignment createTeachingAssignment(
            @RequestBody TeachingAssignmentRequest dto) {

        return teachingAssignmentService.createTeachingAssignment(dto);
    }


    @GetMapping
    public List<TeachingAssignment> getAllTeachingAssignment() {
        return teachingAssignmentService.getAllTeachingAssignment();
    }

    @GetMapping("/{id}")
    public TeachingAssignment getTeachingAssignment(
            @PathVariable Long id) {

        return teachingAssignmentService
                .getTeachingAssignmentById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public TeachingAssignment updateTeachingAssignment(
            @PathVariable Long id,
            @RequestBody TeachingAssignmentRequest dto) {

        return teachingAssignmentService
                .updateTeachingAssignment(id, dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteTeachingAssignment(
            @PathVariable Long id) {

        teachingAssignmentService
                .deleteTeachingAssignment(id);
    }
}