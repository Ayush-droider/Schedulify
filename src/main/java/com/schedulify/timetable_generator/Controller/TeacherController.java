package com.schedulify.timetable_generator.Controller;

import com.schedulify.timetable_generator.Entity.Teacher;
import com.schedulify.timetable_generator.Service.TeacherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Teacher createTeacher(@Valid @RequestBody Teacher teacher) {
        return teacherService.createTeacher(teacher);
    }


    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Teacher updateTeacher(@Valid @RequestBody Teacher teacher, @PathVariable Long id) {
        return teacherService.updateTeacher(teacher, id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public void deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
    }
}
