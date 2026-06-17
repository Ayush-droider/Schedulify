package com.schedulify.timetable_generator.Repository;

import com.schedulify.timetable_generator.Entity.ClassGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassGroupRepository extends JpaRepository<ClassGroup, Long> {
}
