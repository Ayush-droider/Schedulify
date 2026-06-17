package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.Teacher;
import com.schedulify.timetable_generator.Repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor  //@Autowird bhi ye kaam karta but usme field mutable rehti hai final nahi
                            //to fhir changes honge easily aur testing difficult
                            //better hai constructor se inject rko ya ye annotation use krlo
public class TeacherServiceImp implements TeacherService{

    private final TeacherRepository teacherRepository;

    @Override
    public Teacher createTeacher(Teacher teacher) {
        System.out.println("Teacher_Saved");
        return teacherRepository.save(teacher);
    }

    @Override
    public List<Teacher> getAllTeachers() {
        System.out.println("Teachers_Fetched");
        return teacherRepository.findAll();
    }

    @Override
    public Teacher updateTeacher(Teacher teacher, Long id) {
        Teacher existingTeacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        existingTeacher.setName(teacher.getName());
        existingTeacher.setEmail(teacher.getEmail());
        existingTeacher.setDepartment(teacher.getDepartment());

        return teacherRepository.save(existingTeacher);
    }

    @Override
    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }
}
