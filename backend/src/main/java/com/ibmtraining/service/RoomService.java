package com.ibmtraining.service;

import java.util.List;

import com.ibmtraining.domain.Room;

public interface RoomService {

	public List<Room> findAll();
	
	public Room find(Long id);
	
	public List<Room> findByRoomType(String roomType);
	
	public void add(Room room);
	
	public void upsert( Room room);
	
	public void delete(Long id);

}