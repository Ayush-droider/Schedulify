package com.schedulify.timetable_generator.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="Subjects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long subjectId;

    @Column(nullable = false)
    private String subjectName;

    @Column(nullable = false)
    private String subjectCode;

    @Column(nullable = false)
    private Integer weeklyFrequency;

    @Column(nullable = false)
    private Boolean isLab;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="teacher_id")
    private Teacher teacher;
}
