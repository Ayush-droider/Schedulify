package com.schedulify.timetable_generator.Controller;

import com.schedulify.timetable_generator.Entity.Room;
import com.schedulify.timetable_generator.Service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Room createRoom(@RequestBody Room room){
        return roomService.createRoom(room);
    }

    @GetMapping
    public List<Room> getAllRooms(){
        return roomService.getAllRooms();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room room){
        return roomService.updateRoom(room, id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id){
        roomService.deleteRoom(id);
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id){
        return roomService.getRoomByRoomId(id);
    }
}
