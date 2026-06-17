package com.schedulify.timetable_generator.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name="teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder    //---Method ke Arguments ko ulte seedhe krke bhi de skte hai
            // .builder().name().age.email().build(); kisi bhi order me dedo
            //clean object creation

public class Teacher {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(nullable = false) //nullable=false schema layer per kaam krega aur NotBlank application layer pe
    @NotBlank
    private String name;

    @Email
    private String email;

    @Column(nullable = false)
    private String department;

}
