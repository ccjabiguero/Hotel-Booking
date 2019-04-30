package com.ibmtraining.service;


import java.sql.Date;
import java.util.List;

import com.ibmtraining.domain.Room;

public interface RoomService {

	public List<Room> findAll();
	
	public Room find(Long id);
	
	public List<Room> findByRoomType(String roomType);
	
	public void add(Room guest);
	
	public void upsert( Room guest);
	
	public void delete(Long id);

}