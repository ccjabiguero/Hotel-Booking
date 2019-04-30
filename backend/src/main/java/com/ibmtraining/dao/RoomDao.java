package com.ibmtraining.dao;
import java.sql.Date;
import java.util.List;
import com.ibmtraining.domain.Room;

public interface RoomDao {
	
	public List<Room> findAll();
	
	public Room find(Long id);
	
	public List<Room> findByRoomType(String roomType);
	
	public void add(Room room);
	
	public void update(Room room);
	
	public void delete(Long id);

}