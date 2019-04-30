package com.ibmtraining.service;
import java.sql.Date;
import java.util.List;

import javax.ws.rs.PathParam;

import org.apache.commons.lang3.StringUtils;

import com.ibmtraining.dao.RoomDao;
import com.ibmtraining.dao.RoomJdbcDaoImpl;
import com.ibmtraining.domain.Room;

public class RoomServiceImpl implements RoomService{
	
	RoomDao roomDao;

	public RoomServiceImpl() {
		this.roomDao = RoomJdbcDaoImpl.getInstance();
	}
	
	@Override
	public List<Room> findAll() {
		return roomDao.findAll();
	}

	@Override
	public Room find(Long id) {
		return roomDao.find(id);
	}

	@Override
	public List<Room> findByRoomType(String roomType) {
		return roomDao.findByRoomType(roomType);
	}

	@Override
	public void add(Room room) {
		if (validate(room)) {
			roomDao.add(room);
		} else {
			throw new IllegalArgumentException("Fields roomType and price cannot be blank.");
		}
	}

	@Override
	public void upsert(Room room) {
		if (validate(room)) {
			if(room.getId() != null && room.getId() >= 0) {
				roomDao.update(room);
			} else {
				roomDao.add(room);
			}
		} else {
			throw new IllegalArgumentException("Fields roomType and price cannot be blank.");
		}
	}

	@Override
	public void delete(Long id) {
		roomDao.delete(id);
	}
	
	private boolean validate(Room room) {
		return !StringUtils.isAnyBlank(room.getRoomType()) && room.getPrice() == null;
	}

}