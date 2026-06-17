package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.Subject;
import com.schedulify.timetable_generator.Repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectServiceImp implements SubjectService {

    private final SubjectRepository subjectRepository;
    @Override
    public Subject createSubject(Subject subject){
        return subjectRepository.save(subject);
    }

    @Override
    public List<Subject> getAllSubjects(){
        return subjectRepository.findAll();
    }

    @Override
    public Subject updateSubject(Subject subject,Long id) {
        Subject existingSubject = subjectRepository.findById(id)
                .orElseThrow();

        existingSubject.setSubjectCode(subject.getSubjectCode());
        existingSubject.setSubjectName(subject.getSubjectName());
        existingSubject.setWeeklyFrequency(subject.getWeeklyFrequency());
        existingSubject.setIsLab(subject.getIsLab());
        existingSubject.setTeacher(subject.getTeacher());

        return subjectRepository.save(existingSubject);
    }

    @Override
    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }

    @Override
    public Subject getSubjectById(Long id) {
        return  subjectRepository.findById(id)
                .orElseThrow();
    }
}
