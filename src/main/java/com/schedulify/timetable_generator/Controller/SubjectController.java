package com.schedulify.timetable_generator.Controller;

import com.schedulify.timetable_generator.Entity.Subject;
import com.schedulify.timetable_generator.Service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Subject createSubject(@RequestBody Subject subject){
        return subjectService.createSubject(subject);
    }

    @GetMapping
    public List<Subject> getAllSubjects(){
        return subjectService.getAllSubjects();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Subject updateSubject(@PathVariable Long id, @RequestBody Subject subject){
        return subjectService.updateSubject(subject, id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public void deleteSubject(@PathVariable Long id){
        subjectService.deleteSubject(id);
    }

    @GetMapping("{id}")
    public Subject getSubject(@PathVariable Long id){
        return  subjectService.getSubjectById(id);
    }
}
