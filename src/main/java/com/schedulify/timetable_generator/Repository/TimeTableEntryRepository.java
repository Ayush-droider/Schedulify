package com.schedulify.timetable_generator.Repository;

import com.schedulify.timetable_generator.Entity.TimeTableEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimeTableEntryRepository extends JpaRepository<TimeTableEntry, Long> {
    List<TimeTableEntry> findByTimeTableRunId(Long runId);
    void deleteByRoom_Id(Long id);
    void deleteByTeachingAssignment_Id(Long id);
    void deleteByTimeTableRun_Id(Long runId);
}
