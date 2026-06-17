package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.ClassGroup;
import com.schedulify.timetable_generator.Entity.TeachingAssignment;
import com.schedulify.timetable_generator.Repository.ClassGroupRepository;
import com.schedulify.timetable_generator.Repository.TeachingAssignmentRepository;
import com.schedulify.timetable_generator.Repository.TimeTableEntryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClassGroupServiceImp implements ClassGroupService {
    private final ClassGroupRepository classGroupRepository;
    private final TeachingAssignmentRepository teachingAssignmentRepository;
    private final TimeTableEntryRepository timeTableEntryRepository;

    @Override
    public ClassGroup createClassGroup(ClassGroup classGroup) {
        return classGroupRepository.save(classGroup);
    }

    @Override
    public List<ClassGroup> getAllClassGroups() {
        return classGroupRepository.findAll();
    }

    @Override
    public ClassGroup updateClassGroup(ClassGroup classGroup, Long id) {
        ClassGroup oldClassGroup = getClassGroupById(id);
        oldClassGroup.setName(classGroup.getName());
        oldClassGroup.setStrength(classGroup.getStrength());
        return classGroupRepository.save(oldClassGroup);
    }

    @Transactional
    @Override
    public void deleteClassGroup(Long id) {

        List<TeachingAssignment> assignments =
                teachingAssignmentRepository.findByClassGroup_Id(id);

        for (TeachingAssignment ta : assignments) {
            timeTableEntryRepository
                    .deleteByTeachingAssignment_Id(ta.getId());
        }

        teachingAssignmentRepository
                .deleteAll(assignments);

        classGroupRepository.deleteById(id);
    }


    @Override
    public ClassGroup getClassGroupById(Long id) {
        return classGroupRepository.findById(id).orElseThrow();
    }
}
