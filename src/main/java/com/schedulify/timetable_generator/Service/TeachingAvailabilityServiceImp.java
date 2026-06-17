package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.DTO.TeachingAvailabilityRequest;
import com.schedulify.timetable_generator.Entity.Teacher;
import com.schedulify.timetable_generator.Entity.TeachingAvailability;
import com.schedulify.timetable_generator.Entity.Timeslot;
import com.schedulify.timetable_generator.Repository.TeacherAvailabilityRepository;
import com.schedulify.timetable_generator.Repository.TeacherRepository;
import com.schedulify.timetable_generator.Repository.TimeslotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeachingAvailabilityServiceImp implements  TeachingAvailabilityService {

    private final TeacherAvailabilityRepository teacherAvailabilityRepository;
    private final TeacherRepository teacherRepository;
    private final TimeslotRepository timeslotRepository;

//    @Override
//    public TeachingAvailability createTeachingAvailability(TeachingAvailabilityRequest teachingAvailabilityRequest) {
//        Teacher teacher = teacherRepository.findById(teachingAvailabilityRequest.getTeacherId())
//                .orElseThrow(() ->
//                        new RuntimeException("Teacher not found"));
//
//        Timeslot timeslot = timeslotRepository.findById(teachingAvailabilityRequest.getTimeslotId())
//                .orElseThrow(() ->
//                        new RuntimeException("Timeslot not found"));
//
//        TeachingAvailability teachingAvailability =
//                TeachingAvailability.builder()
//                        .teacher(teacher)
//                        .timeslot(timeslot)
//                        .available(teachingAvailabilityRequest.getAvailable())
//                        .build();
//
//        return teacherAvailabilityRepository.save(teachingAvailability);
//
//    }

    @Override
    public TeachingAvailability createTeachingAvailability(TeachingAvailabilityRequest request) {

        System.out.println(request);

        System.out.println("TeacherId = "
                + request.getTeacherId());

        System.out.println("TimeslotId = "
                + request.getTimeslotId());

        System.out.println("Available = "
                + request.getAvailable());

        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() ->
                        new RuntimeException("Teacher not found"));

        Timeslot timeslot = timeslotRepository.findById(request.getTimeslotId())
                .orElseThrow(() ->
                        new RuntimeException("Timeslot not found"));

        TeachingAvailability teachingAvailability =
                TeachingAvailability.builder()
                        .teacher(teacher)
                        .timeslot(timeslot)
                        .available(request.getAvailable())
                        .build();

        return teacherAvailabilityRepository.save(teachingAvailability);
    }

    @Override
    public List<TeachingAvailability> getAllTeachingAvailability() {
        return teacherAvailabilityRepository.findAll();
    }

    @Override
    public TeachingAvailability getTeachingAvailabilityById(Long id) {
        return teacherAvailabilityRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Availability not found"));
    }

    @Override
    public TeachingAvailability updateTeachingAvailability(
            Long id,
            TeachingAvailabilityRequest request) {

        TeachingAvailability availability =
                teacherAvailabilityRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Availability not found"));

        Teacher teacher = teacherRepository.findById(
                        request.getTeacherId())
                .orElseThrow(() ->
                        new RuntimeException("Teacher not found"));

        Timeslot timeslot = timeslotRepository.findById(
                        request.getTimeslotId())
                .orElseThrow(() ->
                        new RuntimeException("Timeslot not found"));

        availability.setTeacher(teacher);
        availability.setTimeslot(timeslot);
        availability.setAvailable(request.getAvailable());

        return teacherAvailabilityRepository.save(availability);
    }

    @Override
    public void deleteTeachingAvailability(Long id) {
        teacherAvailabilityRepository.deleteById(id);
    }
}
