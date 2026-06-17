package com.schedulify.timetable_generator.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@Table(name="teaching_availability")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeachingAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(optional = false)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @ManyToOne(optional = false)
    @JoinColumn(name="timeslot_id")
    private Timeslot timeslot;

    @Column(nullable = false)
    private Boolean available;
}
