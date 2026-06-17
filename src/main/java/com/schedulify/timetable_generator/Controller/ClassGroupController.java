package com.schedulify.timetable_generator.Controller;

import com.schedulify.timetable_generator.Entity.ClassGroup;
import com.schedulify.timetable_generator.Service.ClassGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classgroups")
@RequiredArgsConstructor
public class ClassGroupController {

    private final ClassGroupService classGroupService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ClassGroup createClassGroup(@RequestBody ClassGroup classGroup){
        return classGroupService.createClassGroup(classGroup);
    }

    @GetMapping
    public List<ClassGroup> getAllClassGroups(){
        return classGroupService.getAllClassGroups();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ClassGroup updateClassGroup(@PathVariable Long id, @RequestBody ClassGroup classGroup){
        return classGroupService.updateClassGroup(classGroup,id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteClassGroup(@PathVariable Long id){
        classGroupService.deleteClassGroup(id);
    }

    @GetMapping("/{id}")
    public ClassGroup getClassGroup(@PathVariable Long id){
        return classGroupService.getClassGroupById(id);
    }
}
