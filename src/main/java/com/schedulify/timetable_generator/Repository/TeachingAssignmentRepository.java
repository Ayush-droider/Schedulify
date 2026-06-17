package com.schedulify.timetable_generator.Repository;

import com.schedulify.timetable_generator.Entity.TeachingAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeachingAssignmentRepository extends JpaRepository<TeachingAssignment, Long> {
    List<TeachingAssignment> findByClassGroup_Id(Long id);
}
