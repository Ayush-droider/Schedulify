package com.schedulify.timetable_generator.Entity;

import com.schedulify.timetable_generator.Enums.DayOfTheWeek;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Timeslot")
public class Timeslot {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DayOfTheWeek day;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;
}
