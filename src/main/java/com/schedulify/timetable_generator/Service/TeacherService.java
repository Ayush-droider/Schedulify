package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.Teacher;

import java.util.List;

public interface TeacherService {
    Teacher createTeacher(Teacher teacher);
    List<Teacher> getAllTeachers();
    Teacher updateTeacher(Teacher teacher,Long id);
    void deleteTeacher(Long id);
}
