package com.schedulify.timetable_generator.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(name="faculty-preferences")
public class FacultyPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Teacher teacher;

    private Integer maxLecturesPerDay;

    private Boolean avoidConsecutiveLectures;

    private Boolean preferLunchBreak;
}
