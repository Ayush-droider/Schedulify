package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.ClassGroup;

import java.util.List;

public interface ClassGroupService {
    ClassGroup createClassGroup(ClassGroup classGroup);
    List<ClassGroup> getAllClassGroups();

    ClassGroup updateClassGroup(ClassGroup classGroup,Long id);
    void deleteClassGroup(Long id);
    ClassGroup getClassGroupById(Long id);
}
