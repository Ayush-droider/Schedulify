package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.Room;

import java.util.List;

public interface RoomService {
    Room createRoom(Room room);
    List<Room> getAllRooms();
    Room updateRoom(Room room,Long id);
    void deleteRoom(Long id);
    Room getRoomByRoomId(Long id);
}
