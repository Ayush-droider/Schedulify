package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.DTO.TeachingAssignmentRequest;
import com.schedulify.timetable_generator.Entity.ClassGroup;
import com.schedulify.timetable_generator.Entity.Subject;
import com.schedulify.timetable_generator.Entity.Teacher;
import com.schedulify.timetable_generator.Entity.TeachingAssignment;
import com.schedulify.timetable_generator.Repository.ClassGroupRepository;
import com.schedulify.timetable_generator.Repository.SubjectRepository;
import com.schedulify.timetable_generator.Repository.TeacherRepository;
import com.schedulify.timetable_generator.Repository.TeachingAssignmentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeachingAssignmentServiceImp implements TeachingAssignmentService {

    private final TeachingAssignmentRepository teachingAssignmentRepository;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final ClassGroupRepository classGroupRepository;

    @Override
    @Transactional
    public TeachingAssignment createTeachingAssignment(
            TeachingAssignmentRequest dto) {

        Teacher teacher = teacherRepository.findById(dto.getTeacherId())
                .orElseThrow(() ->
                        new RuntimeException("Teacher not found"));

        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() ->
                        new RuntimeException("Subject not found"));

        ClassGroup classGroup = classGroupRepository.findById(dto.getClassGroupId())
                .orElseThrow(() ->
                        new RuntimeException("Class Group not found"));

        TeachingAssignment assignment = TeachingAssignment.builder()
                .teacher(teacher)
                .subject(subject)
                .classGroup(classGroup)
                .weeklyFrequency(dto.getWeeklyFrequency())
                .build();

        return teachingAssignmentRepository.save(assignment);
    }

    @Override
    public List<TeachingAssignment> getAllTeachingAssignment() {
        return teachingAssignmentRepository.findAll();
    }

    @Override
    public TeachingAssignment getTeachingAssignmentById(Long id) {
        return teachingAssignmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Assignment not found"));
    }

    @Override
    @Transactional
    public TeachingAssignment updateTeachingAssignment(
            Long id,
            TeachingAssignmentRequest dto) {

        TeachingAssignment assignment =
                teachingAssignmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Assignment not found"));

        Teacher teacher = teacherRepository.findById(dto.getTeacherId())
                .orElseThrow(() ->
                        new RuntimeException("Teacher not found"));

        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() ->
                        new RuntimeException("Subject not found"));

        ClassGroup classGroup =
                classGroupRepository.findById(dto.getClassGroupId())
                        .orElseThrow(() ->
                                new RuntimeException("ClassGroup not found"));

        assignment.setTeacher(teacher);
        assignment.setSubject(subject);
        assignment.setClassGroup(classGroup);
        assignment.setWeeklyFrequency(dto.getWeeklyFrequency());

        return teachingAssignmentRepository.save(assignment);
    }

    @Override
    public void deleteTeachingAssignment(Long id) {
        teachingAssignmentRepository.deleteById(id);
    }
}