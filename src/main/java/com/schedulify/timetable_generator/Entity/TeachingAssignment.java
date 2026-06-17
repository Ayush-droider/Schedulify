package com.schedulify.timetable_generator.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name="teaching_assignments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TeachingAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name="teacher_id")
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name="subject_id")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name="class_group_id")
    private ClassGroup classGroup;

    @Column(nullable=false)
    private Integer weeklyFrequency;
}
