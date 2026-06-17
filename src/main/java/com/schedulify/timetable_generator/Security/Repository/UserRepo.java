package com.schedulify.timetable_generator.Security.Repository;

import com.schedulify.timetable_generator.Security.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo
        extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}
