package com.schedulify.timetable_generator.Repository;

import com.schedulify.timetable_generator.Entity.Timeslot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeslotRepository extends JpaRepository<Timeslot, Long> {
}
