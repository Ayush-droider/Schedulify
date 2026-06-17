package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.Subject;

import java.util.List;

public interface SubjectService {
    Subject createSubject(Subject subject);
    List<Subject> getAllSubjects();
    Subject updateSubject(Subject subject,Long id);

    void deleteSubject(Long id);

    Subject getSubjectById(Long id);

}
