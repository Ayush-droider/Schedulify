package com.schedulify.timetable_generator.Service;

import com.schedulify.timetable_generator.Entity.Room;
import com.schedulify.timetable_generator.Entity.TimeTableEntry;
import com.schedulify.timetable_generator.Repository.RoomRepository;
import com.schedulify.timetable_generator.Repository.TimeTableEntryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomServiceImp implements RoomService {

    private final TimeTableEntryRepository timeTableEntryRepository;

    private final RoomRepository roomRepository;
    @Override
    public Room createRoom(Room room){
        return roomRepository.save(room);
    }

    @Override
    public List<Room> getAllRooms(){
        return roomRepository.findAll();
    }

    @Override
    public Room updateRoom(Room room, Long id) {
        Room existingRoom = roomRepository.findById(id).orElseThrow();

        existingRoom.setRoomNumber(room.getRoomNumber());
        existingRoom.setRoomType(room.getRoomType());
        existingRoom.setCapacity(room.getCapacity());

        return roomRepository.save(existingRoom);
    }

    @Override
    public void deleteRoom(Long id) {
        timeTableEntryRepository.deleteByRoom_Id(id);
        roomRepository.deleteById(id);
    }

    @Override
    public Room getRoomByRoomId(Long id) {
        return roomRepository.findById(id).orElseThrow();
    }
}
