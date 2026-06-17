package com.schedulify.timetable_generator.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="Section")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ClassGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique=true)
    private String name;

    @Column(nullable = false)
    private Integer strength;
}
