package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.DTO.CreateTimetableEntryRequest;
import com.schedulify.timetable_generator.DTO.TimeTableEntryResponse;
import com.schedulify.timetable_generator.Entity.Room;
import com.schedulify.timetable_generator.Entity.TeachingAssignment;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;
import com.schedulify.timetable_generator.Entity.Timeslot;
import com.schedulify.timetable_generator.Repository.RoomRepository;
import com.schedulify.timetable_generator.Repository.TeachingAssignmentRepository;
import com.schedulify.timetable_generator.Repository.TimeTableEntryRepository;
import com.schedulify.timetable_generator.Repository.TimeslotRepository;
import com.schedulify.timetable_generator.Mapper.TimeTableEntryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeTableEntryServiceImp implements TimeTableEntryService{

    private final TimeTableEntryRepository timetableEntryRepository;
    private final TeachingAssignmentRepository teachingAssignmentRepository;
    private final TimeslotRepository timeslotRepository;
    private final RoomRepository roomRepository;
    private final TimeTableEntryMapper mapper;

    @Override
    public TimeTableEntryResponse createEntry(CreateTimetableEntryRequest request) {

        TeachingAssignment teachingAssignment=teachingAssignmentRepository.findById(request.getTeachingAssignmentId())
                        .orElseThrow(() -> new RuntimeException("Teaching Assignment not found"));

        Timeslot timeslot=timeslotRepository.findById(request.getTimeslotId())
                        .orElseThrow(() -> new RuntimeException("Timeslot not found"));

        Room room=roomRepository.findById(request.getRoomId())
                        .orElseThrow(() -> new RuntimeException("Room not found"));

        TimeTableEntry entry=TimeTableEntry.builder()
                .teachingAssignment(teachingAssignment)
                .timeslot(timeslot)
                .room(room)
                .build();

        return mapper.mapToResponse(timetableEntryRepository.save(entry));
    }

    @Override
    public List<TimeTableEntryResponse> getAllEntries() {
         return timetableEntryRepository.findAll()
                 .stream()
                 .map(mapper::mapToResponse)
                 .toList();
    }
}
