package com.ibmtraining.dao;
import java.sql.Date;
import java.util.List;
import com.ibmtraining.domain.Booking;

public interface BookingDao {
	
	public List<Booking> findAll();
	
	public Booking find(Long id);
	
	public List<Booking> findByAvailRooms(String checkIn, String checkOut);
	
	public void add(Booking booking);
	
	public void update(Booking booking);
	
	public void delete(Long id);

}